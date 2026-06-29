#!/usr/bin/env node

import { mkdir, writeFile } from "node:fs/promises";
import { createRequire } from "node:module";
import path from "node:path";

const viewports = [
  { name: "mobile", width: 390, height: 844 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "desktop", width: 1440, height: 1000 },
  { name: "wide", width: 1920, height: 1080 },
];

function usage() {
  console.error("Usage: node capture-viewports.mjs <url> [output-dir] [--full-page] [--wait=ms]");
}

const args = process.argv.slice(2);
const positional = args.filter((arg) => !arg.startsWith("--"));
const [url, outputDir = "figma-web-screenshots"] = positional;
const fullPage = args.includes("--full-page");
const waitArg = args.find((arg) => arg.startsWith("--wait="));
const waitMs = waitArg ? Number(waitArg.slice("--wait=".length)) : 500;

if (!url) {
  usage();
  process.exit(2);
}

function loadPlaywright() {
  const requires = [
    createRequire(path.join(process.cwd(), "package.json")),
    createRequire(import.meta.url),
  ];

  for (const requireFrom of requires) {
    try {
      return requireFrom("playwright");
    } catch {
      // Try the next resolution base.
    }
  }

  throw new Error("Cannot resolve playwright from the current project or this skill.");
}

let chromium;
try {
  ({ chromium } = loadPlaywright());
} catch (error) {
  console.error("Playwright is required. Install it in the project or run with a workspace that already provides it.");
  console.error(error?.message || error);
  process.exit(1);
}

await mkdir(outputDir, { recursive: true });

const browser = await chromium.launch();
const summary = {
  url,
  outputDir: path.resolve(outputDir),
  fullPage,
  waitMs,
  captures: [],
  console: [],
  pageErrors: [],
};

try {
  for (const viewport of viewports) {
    const page = await browser.newPage({ viewport });
    page.on("console", (message) => {
      if (["error", "warning"].includes(message.type())) {
        summary.console.push({
          viewport: viewport.name,
          type: message.type(),
          text: message.text(),
        });
      }
    });
    page.on("pageerror", (error) => {
      summary.pageErrors.push({
        viewport: viewport.name,
        message: error.message,
      });
    });

    const response = await page.goto(url, { waitUntil: "networkidle" });
    if (waitMs > 0) {
      await page.waitForTimeout(waitMs);
    }

    const screenshotPath = path.join(outputDir, `${viewport.name}-${viewport.width}x${viewport.height}.png`);
    await page.screenshot({ path: screenshotPath, fullPage });

    const metrics = await page.evaluate(() => {
      const root = document.documentElement;
      const body = document.body;
      return {
        title: document.title,
        scrollWidth: Math.max(root.scrollWidth, body?.scrollWidth || 0),
        clientWidth: root.clientWidth,
        scrollHeight: Math.max(root.scrollHeight, body?.scrollHeight || 0),
        clientHeight: root.clientHeight,
        hasHorizontalOverflow: Math.max(root.scrollWidth, body?.scrollWidth || 0) > root.clientWidth + 1,
      };
    });

    summary.captures.push({
      viewport,
      status: response?.status() ?? null,
      screenshot: path.resolve(screenshotPath),
      metrics,
    });

    await page.close();
  }
} finally {
  await browser.close();
}

const summaryPath = path.join(outputDir, "summary.json");
await writeFile(summaryPath, `${JSON.stringify(summary, null, 2)}\n`);
console.log(JSON.stringify({ summary: path.resolve(summaryPath), captures: summary.captures }, null, 2));

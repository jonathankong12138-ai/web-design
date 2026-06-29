#!/usr/bin/env node

import { mkdir, writeFile } from "node:fs/promises";
import { createRequire } from "node:module";
import path from "node:path";

const DEFAULT_VIEWPORTS = [
  { name: "375x812", width: 375, height: 812, terminal: "narrow-mobile" },
  { name: "390x844", width: 390, height: 844, terminal: "common-mobile" },
  { name: "414x896", width: 414, height: 896, terminal: "large-mobile" },
  { name: "430x932", width: 430, height: 932, terminal: "modern-large-mobile" },
  { name: "768x1024", width: 768, height: 1024, terminal: "tablet-portrait" },
  { name: "1024x768", width: 1024, height: 768, terminal: "compact-desktop" },
  { name: "1440x900", width: 1440, height: 900, terminal: "standard-desktop" },
  { name: "1920x1080", width: 1920, height: 1080, terminal: "wide-desktop" },
];

function parseArgs(argv) {
  const args = {
    out: ".visual-qa",
    wait: 500,
    fullPage: true,
  };

  for (let i = 2; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--help" || arg === "-h") {
      args.help = true;
    } else if (arg === "--url") {
      args.url = argv[++i];
    } else if (arg === "--out") {
      args.out = argv[++i];
    } else if (arg === "--wait") {
      args.wait = Number(argv[++i]);
    } else if (arg === "--viewport") {
      args.viewport = argv[++i];
    } else if (arg === "--breakpoints") {
      args.breakpoints = argv[++i];
    } else if (arg === "--canonical") {
      args.canonical = argv[++i];
    } else if (arg === "--no-full-page") {
      args.fullPage = false;
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }

  return args;
}

function printHelp() {
  console.log(`Frontend visual QA audit

Usage:
  node visual-audit.mjs --url http://localhost:5173 --out .visual-qa

Options:
  --url <url>             Page URL to audit. Required.
  --out <dir>             Output directory. Default: .visual-qa
  --wait <ms>             Extra wait after load. Default: 500
  --viewport <sizes>      Comma-separated viewport names/sizes, e.g. 375x812,1440x900
  --breakpoints <widths>  Comma-separated breakpoint widths. Adds width-1,width,width+1 edge checks.
  --canonical <size>      Label the canonical screenshot, e.g. 1440x900 or desktop.
  --no-full-page          Capture only the viewport instead of full page
  --help                  Show this help
`);
}

function terminalForWidth(width) {
  if (width <= 379) return "narrow-mobile";
  if (width <= 399) return "common-mobile";
  if (width <= 419) return "large-mobile";
  if (width <= 479) return "modern-large-mobile";
  if (width < 900) return "tablet-portrait";
  if (width < 1200) return "compact-desktop";
  if (width < 1700) return "standard-desktop";
  return "wide-desktop";
}

function defaultHeightForWidth(width) {
  if (width <= 375) return 812;
  if (width <= 390) return 844;
  if (width <= 430) return 932;
  if (width < 900) return 1024;
  if (width < 1200) return 768;
  if (width < 1700) return 900;
  return 1080;
}

function viewportFromSize(size) {
  const match = /^(\d+)x(\d+)$/.exec(size);
  if (!match) return null;
  const width = Number(match[1]);
  const height = Number(match[2]);
  return {
    name: `${width}x${height}`,
    width,
    height,
    terminal: terminalForWidth(width),
  };
}

function uniqueViewports(viewports) {
  const map = new Map();
  for (const viewport of viewports) {
    map.set(viewport.name, viewport);
  }
  return [...map.values()].sort((a, b) => a.width - b.width || a.height - b.height);
}

function pickViewports(selection, breakpoints) {
  let picked = DEFAULT_VIEWPORTS;

  if (selection) {
    const requested = selection.split(",").map((item) => item.trim()).filter(Boolean);
    picked = requested.map((name) => {
      const known = DEFAULT_VIEWPORTS.find((viewport) => viewport.name === name);
      const custom = viewportFromSize(name);
      if (!known && !custom) throw new Error(`Unknown viewport: ${name}`);
      return known || custom;
    });
  }

  const edgeViewports = [];
  if (breakpoints) {
    for (const raw of breakpoints.split(",").map((item) => item.trim()).filter(Boolean)) {
      const width = Number(raw);
      if (!Number.isInteger(width) || width <= 1) {
        throw new Error(`Invalid breakpoint width: ${raw}`);
      }
      for (const edgeWidth of [width - 1, width, width + 1]) {
        const height = defaultHeightForWidth(edgeWidth);
        edgeViewports.push({
          name: `${edgeWidth}x${height}`,
          width: edgeWidth,
          height,
          terminal: terminalForWidth(edgeWidth),
          breakpointEdge: width,
        });
      }
    }
  }

  return uniqueViewports([...picked, ...edgeViewports]);
}

async function collectPageSignals(page) {
  return page.evaluate(({ maxOverlapPairs }) => {
    const importantSelector = [
      "a",
      "button",
      "input",
      "select",
      "textarea",
      "label",
      "summary",
      "[role='button']",
      "[role='link']",
      "[role='tab']",
      "[role='menuitem']",
      "h1",
      "h2",
      "h3",
      "h4",
      "p",
      "li",
      "img",
      "video",
      "canvas",
      "svg",
      "header",
      "nav",
      "main",
      "section",
      "footer",
      "[data-visual-qa]",
    ].join(",");

    const carouselSelector = [
      "[class*='carousel' i]",
      "[class*='slider' i]",
      "[class*='swiper' i]",
      "[class*='gallery' i]",
      "[class*='track' i]",
      "[data-carousel]",
      "[aria-roledescription*='carousel' i]",
    ].join(",");

    const isElementVisible = (el) => {
      const style = window.getComputedStyle(el);
      const rect = el.getBoundingClientRect();
      return (
        style.display !== "none" &&
        style.visibility !== "hidden" &&
        Number(style.opacity || "1") > 0.01 &&
        rect.width > 0 &&
        rect.height > 0
      );
    };

    const selectorFor = (el) => {
      const tag = el.tagName.toLowerCase();
      const id = el.id ? `#${CSS.escape(el.id)}` : "";
      const testId = el.getAttribute("data-testid") || el.getAttribute("data-test");
      const qa = testId ? `[data-testid="${testId}"]` : "";
      const className = typeof el.className === "string"
        ? el.className.trim().split(/\s+/).slice(0, 3).filter(Boolean).map((name) => `.${CSS.escape(name)}`).join("")
        : "";
      return `${tag}${id}${qa}${id || qa ? "" : className}`;
    };

    const textPreview = (el) => {
      const text = (el.innerText || el.getAttribute("aria-label") || el.alt || "").replace(/\s+/g, " ").trim();
      return text.length > 100 ? `${text.slice(0, 97)}...` : text;
    };

    const rectFor = (el) => {
      const rect = el.getBoundingClientRect();
      return {
        left: Math.round(rect.left),
        top: Math.round(rect.top),
        right: Math.round(rect.right),
        bottom: Math.round(rect.bottom),
        width: Math.round(rect.width),
        height: Math.round(rect.height),
      };
    };

    const intersectionArea = (a, b) => {
      const width = Math.max(0, Math.min(a.right, b.right) - Math.max(a.left, b.left));
      const height = Math.max(0, Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top));
      return width * height;
    };

    const area = (rect) => Math.max(0, rect.width) * Math.max(0, rect.height);

    const cssNumber = (value) => {
      const number = Number.parseFloat(value);
      return Number.isFinite(number) ? number : null;
    };

    const textLength = (el) => (el.innerText || "").replace(/\s+/g, " ").trim().length;

    const all = [...document.querySelectorAll("body *")].filter(isElementVisible);
    const important = [...document.querySelectorAll(importantSelector)]
      .filter(isElementVisible)
      .slice(0, 520);

    const viewport = {
      width: window.innerWidth,
      height: window.innerHeight,
      scrollWidth: document.documentElement.scrollWidth,
      scrollHeight: document.documentElement.scrollHeight,
      clientWidth: document.documentElement.clientWidth,
      clientHeight: document.documentElement.clientHeight,
    };

    const horizontalOverflow = all
      .map((el) => ({ el, rect: rectFor(el) }))
      .filter(({ rect }) => rect.left < -2 || rect.right > viewport.width + 2)
      .slice(0, 80)
      .map(({ el, rect }) => ({
        selector: selectorFor(el),
        text: textPreview(el),
        rect,
      }));

    const clippedText = all
      .filter((el) => {
        const text = textPreview(el);
        if (!text || text.length < 3) return false;
        const style = window.getComputedStyle(el);
        const clipsX = ["hidden", "clip", "auto", "scroll"].includes(style.overflowX);
        const clipsY = ["hidden", "clip", "auto", "scroll"].includes(style.overflowY);
        return (clipsX && el.scrollWidth > el.clientWidth + 2) || (clipsY && el.scrollHeight > el.clientHeight + 2);
      })
      .slice(0, 80)
      .map((el) => ({
        selector: selectorFor(el),
        text: textPreview(el),
        rect: rectFor(el),
        scrollWidth: el.scrollWidth,
        clientWidth: el.clientWidth,
        scrollHeight: el.scrollHeight,
        clientHeight: el.clientHeight,
      }));

    const smallText = all
      .filter((el) => {
        const text = textPreview(el);
        if (!text || text.length < 3) return false;
        const style = window.getComputedStyle(el);
        const fontSize = cssNumber(style.fontSize);
        return fontSize !== null && fontSize < 12;
      })
      .slice(0, 80)
      .map((el) => ({
        selector: selectorFor(el),
        text: textPreview(el),
        fontSize: window.getComputedStyle(el).fontSize,
        rect: rectFor(el),
      }));

    const longWordRisks = all
      .filter((el) => {
        const text = textPreview(el);
        if (!text) return false;
        const longestWord = Math.max(0, ...text.split(/\s+/).map((word) => word.length));
        return longestWord >= 18 && (el.scrollWidth > el.clientWidth + 2 || rectFor(el).right > viewport.width + 2);
      })
      .slice(0, 60)
      .map((el) => ({
        selector: selectorFor(el),
        text: textPreview(el),
        rect: rectFor(el),
        scrollWidth: el.scrollWidth,
        clientWidth: el.clientWidth,
      }));

    const touchTargets = [...document.querySelectorAll("a,button,input,select,textarea,summary,[role='button'],[role='link'],[role='tab'],[tabindex]")]
      .filter(isElementVisible)
      .filter((el) => {
        const rect = el.getBoundingClientRect();
        return window.innerWidth <= 430 && (rect.width < 44 || rect.height < 44);
      })
      .slice(0, 80)
      .map((el) => ({
        selector: selectorFor(el),
        text: textPreview(el),
        rect: rectFor(el),
      }));

    const mediaIssues = [...document.querySelectorAll("img,video,canvas,svg")]
      .filter(isElementVisible)
      .map((el) => {
        const rect = el.getBoundingClientRect();
        const naturalWidth = el.naturalWidth || el.videoWidth || 0;
        const naturalHeight = el.naturalHeight || el.videoHeight || 0;
        const naturalRatio = naturalWidth && naturalHeight ? naturalWidth / naturalHeight : null;
        const renderedRatio = rect.width && rect.height ? rect.width / rect.height : null;
        const ratioDelta = naturalRatio && renderedRatio ? Math.abs(renderedRatio - naturalRatio) / naturalRatio : 0;
        return {
          el,
          issue: rect.width === 0 || rect.height === 0 || ratioDelta > 0.28,
          ratioDelta,
        };
      })
      .filter((entry) => entry.issue)
      .slice(0, 80)
      .map(({ el, ratioDelta }) => ({
        selector: selectorFor(el),
        text: textPreview(el),
        rect: rectFor(el),
        ratioDelta: Number(ratioDelta.toFixed(2)),
      }));

    const headings = [...document.querySelectorAll("h1,h2,h3,h4,[role='heading']")]
      .filter(isElementVisible)
      .slice(0, 50)
      .map((el) => {
        const style = window.getComputedStyle(el);
        return {
          selector: selectorFor(el),
          text: textPreview(el),
          level: el.tagName.toLowerCase(),
          rect: rectFor(el),
          fontSize: style.fontSize,
          lineHeight: style.lineHeight,
          zIndex: style.zIndex,
        };
      });

    const controls = [...document.querySelectorAll("a,button,[role='button'],[role='link'],[role='tab'],summary")]
      .filter(isElementVisible)
      .slice(0, 80)
      .map((el) => ({
        selector: selectorFor(el),
        text: textPreview(el),
        rect: rectFor(el),
      }));

    const separatorCount = all.filter((el) => {
      const style = window.getComputedStyle(el);
      const rect = el.getBoundingClientRect();
      const role = el.getAttribute("role");
      const borderStrength = [
        style.borderTopWidth,
        style.borderBottomWidth,
        style.borderLeftWidth,
        style.borderRightWidth,
      ].map(cssNumber).some((number) => number !== null && number >= 1);
      return el.tagName.toLowerCase() === "hr" || role === "separator" || (borderStrength && (rect.height <= 4 || rect.width <= 4));
    }).length;

    const candidates = important.map((el) => ({ el, rect: rectFor(el), selector: selectorFor(el), text: textPreview(el) }));
    const overlaps = [];
    for (let i = 0; i < candidates.length; i += 1) {
      for (let j = i + 1; j < candidates.length; j += 1) {
        const a = candidates[i];
        const b = candidates[j];
        if (a.el.contains(b.el) || b.el.contains(a.el)) continue;
        const overlapArea = intersectionArea(a.rect, b.rect);
        if (overlapArea < 144) continue;
        const smallerArea = Math.max(1, Math.min(area(a.rect), area(b.rect)));
        if (overlapArea / smallerArea < 0.18) continue;
        overlaps.push({
          area: Math.round(overlapArea),
          a: { selector: a.selector, text: a.text, rect: a.rect },
          b: { selector: b.selector, text: b.text, rect: b.rect },
        });
        if (overlaps.length >= maxOverlapPairs) break;
      }
      if (overlaps.length >= maxOverlapPairs) break;
    }

    const fixedOrSticky = all
      .filter((el) => {
        const style = window.getComputedStyle(el);
        const rect = el.getBoundingClientRect();
        return ["fixed", "sticky"].includes(style.position) && rect.height > viewport.height * 0.18;
      })
      .slice(0, 30)
      .map((el) => ({
        selector: selectorFor(el),
        text: textPreview(el),
        position: window.getComputedStyle(el).position,
        rect: rectFor(el),
      }));

    const activeMatches = (el) => {
      const className = typeof el.className === "string" ? el.className.toLowerCase() : "";
      return (
        el.getAttribute("aria-selected") === "true" ||
        el.getAttribute("aria-current") === "true" ||
        el.getAttribute("data-active") === "true" ||
        /\b(active|current|selected|is-active)\b/.test(className)
      );
    };

    const carouselCandidateSet = new Set();
    for (const el of document.querySelectorAll(carouselSelector)) {
      if (isElementVisible(el)) carouselCandidateSet.add(el);
    }
    for (const el of all) {
      const rect = el.getBoundingClientRect();
      const style = window.getComputedStyle(el);
      const childCount = [...el.children].filter(isElementVisible).length;
      if (
        childCount >= 2 &&
        rect.width > 120 &&
        rect.height > 60 &&
        el.scrollWidth > el.clientWidth + 12 &&
        ["auto", "scroll", "hidden"].includes(style.overflowX)
      ) {
        carouselCandidateSet.add(el);
      }
    }

    const carouselCandidates = [...carouselCandidateSet].slice(0, 24).map((el) => {
      const rect = rectFor(el);
      const style = window.getComputedStyle(el);
      const itemCandidates = [...el.children].filter(isElementVisible);
      const namedItems = [...el.querySelectorAll("[class*='slide' i],[class*='item' i],[data-slide],[role='group']")]
        .filter(isElementVisible);
      const items = (namedItems.length ? namedItems : itemCandidates).slice(0, 40);
      const visibleItems = items.filter((item) => {
        const itemRect = rectFor(item);
        const overlap = intersectionArea(rect, itemRect);
        const itemArea = Math.max(1, area(itemRect));
        return overlap > 24 && overlap / itemArea > 0.15;
      });
      const itemWidths = visibleItems.map((item) => rectFor(item).width).filter((width) => width > 0);
      const activeCount = items.filter(activeMatches).length;
      return {
        selector: selectorFor(el),
        text: textPreview(el),
        rect,
        overflowX: style.overflowX,
        scrollLeft: Math.round(el.scrollLeft),
        scrollWidth: el.scrollWidth,
        clientWidth: el.clientWidth,
        childCount: itemCandidates.length,
        itemCandidateCount: items.length,
        visibleItemCount: visibleItems.length,
        activeCount,
        visibleItemWidths: itemWidths.slice(0, 8),
      };
    });

    const sampleCanvas = (canvas) => {
      const width = canvas.width;
      const height = canvas.height;
      if (!width || !height) {
        return { readable: false, reason: "zero drawing buffer" };
      }

      const summarizePixels = (pixels) => {
        let lumaSum = 0;
        let alphaSum = 0;
        const lumas = [];
        const count = Math.max(1, pixels.length / 4);
        for (let i = 0; i < pixels.length; i += 4) {
          const alpha = pixels[i + 3];
          const luma = 0.2126 * pixels[i] + 0.7152 * pixels[i + 1] + 0.0722 * pixels[i + 2];
          lumaSum += luma;
          alphaSum += alpha;
          lumas.push(luma);
        }
        const meanLuma = lumaSum / count;
        const meanAlpha = alphaSum / count;
        const variance = lumas.reduce((sum, luma) => sum + (luma - meanLuma) ** 2, 0) / count;
        return {
          readable: true,
          meanLuma: Number(meanLuma.toFixed(1)),
          meanAlpha: Number(meanAlpha.toFixed(1)),
          lumaVariance: Number(variance.toFixed(1)),
          suspiciousBlank: (meanAlpha < 8) || (variance < 3 && meanLuma > 238),
        };
      };

      try {
        const ctx = canvas.getContext("2d", { willReadFrequently: true });
        if (ctx) {
          const sx = Math.max(0, Math.floor(width * 0.1));
          const sy = Math.max(0, Math.floor(height * 0.1));
          const sw = Math.max(1, Math.min(24, width - sx));
          const sh = Math.max(1, Math.min(24, height - sy));
          return { method: "2d", ...summarizePixels(ctx.getImageData(sx, sy, sw, sh).data) };
        }
      } catch (error) {
        return { readable: false, reason: error.message };
      }

      try {
        const gl = canvas.getContext("webgl2") || canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
        if (gl) {
          const sampleWidth = Math.max(1, Math.min(8, gl.drawingBufferWidth));
          const sampleHeight = Math.max(1, Math.min(8, gl.drawingBufferHeight));
          const x = Math.max(0, Math.floor((gl.drawingBufferWidth - sampleWidth) / 2));
          const y = Math.max(0, Math.floor((gl.drawingBufferHeight - sampleHeight) / 2));
          const pixels = new Uint8Array(sampleWidth * sampleHeight * 4);
          gl.readPixels(x, y, sampleWidth, sampleHeight, gl.RGBA, gl.UNSIGNED_BYTE, pixels);
          return { method: "webgl", ...summarizePixels(pixels) };
        }
      } catch (error) {
        return { readable: false, reason: error.message };
      }

      return { readable: false, reason: "no readable 2d or webgl context" };
    };

    const dynamicBackgrounds = [...document.querySelectorAll("canvas,video")]
      .filter(isElementVisible)
      .slice(0, 40)
      .map((el) => {
        const style = window.getComputedStyle(el);
        const rect = rectFor(el);
        const viewportArea = Math.max(1, viewport.width * viewport.height);
        const base = {
          selector: selectorFor(el),
          type: el.tagName.toLowerCase(),
          rect,
          areaRatio: Number((area(rect) / viewportArea).toFixed(3)),
          cssWidth: style.width,
          cssHeight: style.height,
          opacity: style.opacity,
          display: style.display,
          visibility: style.visibility,
          position: style.position,
          zIndex: style.zIndex,
        };
        if (el.tagName.toLowerCase() === "canvas") {
          return {
            ...base,
            drawingWidth: el.width,
            drawingHeight: el.height,
            sample: sampleCanvas(el),
          };
        }
        return {
          ...base,
          videoWidth: el.videoWidth,
          videoHeight: el.videoHeight,
          readyState: el.readyState,
          paused: el.paused,
          currentTime: Number(el.currentTime.toFixed(2)),
        };
      });

    const largeEmptyBlocks = all
      .filter((el) => {
        const rect = rectFor(el);
        const text = textLength(el);
        const mediaCount = el.querySelectorAll("img,video,canvas,svg").length;
        const controlCount = el.querySelectorAll("a,button,[role='button'],[role='link'],[role='tab']").length;
        if (rect.height < viewport.height * 0.7 || rect.width < viewport.width * 0.55) return false;
        if (el === document.body || el === document.documentElement) return false;
        return text < 120 && mediaCount <= 1 && controlCount <= 1;
      })
      .slice(0, 50)
      .map((el) => ({
        selector: selectorFor(el),
        text: textPreview(el),
        rect: rectFor(el),
      }));

    const wideScreenRisks = viewport.width >= 1440
      ? all
        .filter((el) => {
          const rect = rectFor(el);
          const text = textLength(el);
          const style = window.getComputedStyle(el);
          const fontSize = cssNumber(style.fontSize) || 16;
          return (
            (text > 90 && rect.width > 920 && fontSize < 28) ||
            (rect.width > viewport.width * 0.92 && rect.height > 120 && text > 40)
          );
        })
        .slice(0, 60)
        .map((el) => ({
          selector: selectorFor(el),
          text: textPreview(el),
          rect: rectFor(el),
        }))
      : [];

    return {
      url: window.location.href,
      title: document.title,
      viewport,
      hasHorizontalPageScroll: viewport.scrollWidth > viewport.clientWidth + 2,
      horizontalOverflow,
      clippedText,
      smallText,
      longWordRisks,
      touchTargets,
      mediaIssues,
      headings,
      controls,
      separatorCount,
      overlaps,
      fixedOrSticky,
      carouselCandidates,
      dynamicBackgrounds,
      largeEmptyBlocks,
      wideScreenRisks,
    };
  }, { maxOverlapPairs: 120 });
}

async function loadPlaywright() {
  const candidates = [];

  try {
    const requireFromCwd = createRequire(path.join(process.cwd(), "package.json"));
    candidates.push(() => requireFromCwd("playwright"));
  } catch {
    // Ignore and try native ESM resolution below.
  }

  candidates.push(() => import("playwright"));

  for (const load of candidates) {
    try {
      return await load();
    } catch {
      // Try the next resolution strategy.
    }
  }

  throw new Error("Playwright is required. Run this from a project that already has Playwright installed, or install Playwright before using this script.");
}

function summarizeSignals(result) {
  const signals = result.signals;
  const items = [];
  if (signals.hasHorizontalPageScroll) {
    items.push(`- Page has horizontal scroll: scrollWidth ${signals.viewport.scrollWidth} > clientWidth ${signals.viewport.clientWidth}`);
  }
  if (signals.horizontalOverflow.length) {
    items.push(`- ${signals.horizontalOverflow.length} visible element(s) extend outside the viewport.`);
  }
  if (signals.clippedText.length) {
    items.push(`- ${signals.clippedText.length} text element(s) appear clipped or scroll inside their container.`);
  }
  if (signals.smallText.length) {
    items.push(`- ${signals.smallText.length} text element(s) are below 12px.`);
  }
  if (signals.longWordRisks.length) {
    items.push(`- ${signals.longWordRisks.length} long-word or English overflow risk(s) detected.`);
  }
  if (signals.touchTargets.length) {
    items.push(`- ${signals.touchTargets.length} mobile touch target(s) are smaller than 44px in one dimension.`);
  }
  if (signals.mediaIssues.length) {
    items.push(`- ${signals.mediaIssues.length} media element(s) may be zero-sized or distorted.`);
  }
  if (signals.overlaps.length) {
    items.push(`- ${signals.overlaps.length} important element overlap candidate(s) detected.`);
  }
  if (signals.fixedOrSticky.length) {
    items.push(`- ${signals.fixedOrSticky.length} fixed/sticky element(s) occupy more than 18% of viewport height.`);
  }
  if (signals.carouselCandidates.length) {
    const details = signals.carouselCandidates.slice(0, 4).map((item) => {
      return `${item.selector}: visible=${item.visibleItemCount}, active=${item.activeCount}, overflowX=${item.overflowX}, scrollLeft=${item.scrollLeft}`;
    });
    items.push(`- ${signals.carouselCandidates.length} carousel/gallery/horizontal-track candidate(s): ${details.join("; ")}`);
  }
  if (signals.dynamicBackgrounds.length) {
    const suspicious = signals.dynamicBackgrounds.filter((item) => {
      const opacity = Number.parseFloat(item.opacity);
      return (item.sample && item.sample.suspiciousBlank) || (Number.isFinite(opacity) && opacity < 0.08) || item.areaRatio < 0.02;
    });
    items.push(`- ${signals.dynamicBackgrounds.length} canvas/video dynamic visual candidate(s); ${suspicious.length} require screenshot attention for blank/faint rendering.`);
  }
  if (signals.largeEmptyBlocks.length) {
    items.push(`- ${signals.largeEmptyBlocks.length} large low-content block(s) may indicate abnormal section height or empty space.`);
  }
  if (signals.wideScreenRisks.length) {
    items.push(`- ${signals.wideScreenRisks.length} wide-screen stretch/line-length risk(s) detected.`);
  }
  items.push(`- Headings detected: ${signals.headings.length}; controls detected: ${signals.controls.length}; separator candidates: ${signals.separatorCount}.`);
  return items.join("\n");
}

async function main() {
  const args = parseArgs(process.argv);
  if (args.help) {
    printHelp();
    return;
  }
  if (!args.url) {
    throw new Error("Missing required --url");
  }

  const { chromium } = await loadPlaywright();

  const viewports = pickViewports(args.viewport, args.breakpoints);
  const outputDir = path.resolve(args.out);
  const screenshotDir = path.join(outputDir, "screenshots");
  await mkdir(screenshotDir, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const results = [];

  try {
    for (const viewport of viewports) {
      const page = await browser.newPage({ viewport: { width: viewport.width, height: viewport.height } });
      page.setDefaultTimeout(20_000);
      await page.goto(args.url, { waitUntil: "domcontentloaded" });
      await page.waitForLoadState("networkidle", { timeout: 5_000 }).catch(() => {});
      await page.evaluate(() => window.scrollTo(0, 0)).catch(() => {});
      if (args.wait > 0) await page.waitForTimeout(args.wait);

      const screenshotPath = path.join(screenshotDir, `${viewport.name}.png`);
      await page.screenshot({ path: screenshotPath, fullPage: args.fullPage });
      const signals = await collectPageSignals(page);

      results.push({
        viewport,
        screenshot: screenshotPath,
        signals,
      });

      await page.close();
    }
  } finally {
    await browser.close();
  }

  const metadata = {
    url: args.url,
    canonical: args.canonical || null,
    generatedAt: new Date().toISOString(),
    requiredScreenshotReview: true,
    viewports,
  };

  const auditPath = path.join(outputDir, "audit.json");
  await writeFile(auditPath, `${JSON.stringify({ ...metadata, results }, null, 2)}\n`, "utf8");

  const report = [
    "# Frontend Visual QA Audit",
    "",
    `URL: ${args.url}`,
    `Canonical baseline: ${args.canonical || "not specified"}`,
    `Generated: ${metadata.generatedAt}`,
    "",
    "## Viewports Captured",
    "",
    ...viewports.map((viewport) => `- ${viewport.name} (${viewport.terminal}${viewport.breakpointEdge ? `, breakpoint ${viewport.breakpointEdge}` : ""})`),
    "",
    "## Viewport Signals",
    "",
    ...results.flatMap((result) => [
      `### ${result.viewport.name} (${result.viewport.terminal})`,
      "",
      `Screenshot: ${result.screenshot}`,
      "",
      summarizeSignals(result),
      "",
    ]),
    "## Required Manual Screenshot Review",
    "",
    "For each captured terminal, compare the screenshot against the canonical baseline. Confirm text/background overlap, hierarchy drift, divider/group loss, carousel intent, dynamic background visibility, content density, and wide-screen stretch. Automated DOM signals are only risk indicators.",
    "",
  ].join("\n");

  const reportPath = path.join(outputDir, "report.md");
  await writeFile(reportPath, report, "utf8");

  console.log(`Wrote ${auditPath}`);
  console.log(`Wrote ${reportPath}`);
  console.log(`Wrote screenshots to ${screenshotDir}`);
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});

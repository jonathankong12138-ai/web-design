#!/usr/bin/env node
import { cp, mkdir, stat } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const skillRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const templateDir = resolve(skillRoot, 'assets', 'prototype-template');
const targetArg = process.argv[2] ?? 'prototype-review';
const targetDir = resolve(process.cwd(), targetArg);

try {
  await stat(targetDir);
  console.error(`Target already exists: ${targetDir}`);
  process.exit(1);
} catch {
  await mkdir(dirname(targetDir), { recursive: true });
  await cp(templateDir, targetDir, { recursive: true });
  console.log(`Created prototype template at ${targetDir}`);
}

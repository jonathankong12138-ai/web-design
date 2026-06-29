import { readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const distDir = resolve(root, 'dist');
const indexPath = resolve(distDir, 'index.html');
const backupPath = resolve(distDir, 'index.external.html');
const instructionsPath = resolve(distDir, 'README.txt');

function escapeClosingScript(source) {
  return source.replaceAll('</script', '<\\/script');
}

async function replaceAsync(value, pattern, replacer) {
  const matches = [...value.matchAll(pattern)];
  let result = '';
  let lastIndex = 0;

  for (const match of matches) {
    result += value.slice(lastIndex, match.index);
    result += await replacer(...match);
    lastIndex = match.index + match[0].length;
  }

  result += value.slice(lastIndex);
  return result;
}

let html = await readFile(indexPath, 'utf8');
await writeFile(backupPath, html);

html = await replaceAsync(html, /<link rel="stylesheet" crossorigin href="(.+?\.css)">/g, async (_match, href) => {
  const css = await readFile(resolve(distDir, href.replace(/^\.\//, '')), 'utf8');
  return `<style>\n${css}\n</style>`;
});

html = await replaceAsync(html, /<script type="module" crossorigin src="(.+?\.js)"><\/script>/g, async (_match, src) => {
  const js = escapeClosingScript(await readFile(resolve(distDir, src.replace(/^\.\//, '')), 'utf8'));
  return `<script type="module">\n${js}\n</script>`;
});

await writeFile(indexPath, html);
await writeFile(
  instructionsPath,
  [
    'Reviewable prototype open instructions',
    '',
    '1. Open index.html in Chrome, Edge, Safari, or Firefox.',
    '2. No Node.js, terminal, server, or network connection is required.',
    '3. Review comments use browser localStorage when available.',
    '',
  ].join('\n'),
);

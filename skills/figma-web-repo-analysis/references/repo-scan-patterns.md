# Repo Scan Patterns

Use `rg --files` first, then targeted reads.

## Stack

Look for:

```txt
package.json
vite.config.*
next.config.*
astro.config.*
remix.config.*
tailwind.config.*
tsconfig.json
shopify.theme.toml
layout/theme.liquid
templates/
sections/
src/
app/
pages/
```

## Package Manager

Use lockfiles:

```txt
pnpm-lock.yaml -> pnpm
yarn.lock -> yarn
package-lock.json -> npm
bun.lockb or bun.lock -> bun
```

## Routes And Entries

Search:

```txt
rg --files | rg '(^|/)(app|pages|routes|templates|sections|layout|src)'
rg 'export default|createBrowserRouter|Route|definePageMeta|template|section'
```

## Components

Search:

```txt
rg --files | rg '(components|ui|blocks|sections)'
rg 'Button|Card|Modal|Drawer|Tabs|Carousel|Accordion|Form'
```

## Styling

Search:

```txt
rg --files | rg '(css|scss|sass|less|tailwind|theme|tokens)'
rg '--[a-z0-9-]+:|@theme|className=|class=|styles\\.|module\\.css'
```

## Assets

Search:

```txt
rg --files | rg '(assets|public|static|images|icons|fonts)'
rg 'img_url|asset_url|url\\(|<img|Image\\b|picture\\b'
```

## Commands

Read `package.json` scripts, framework docs in repo, or theme config. Record only commands that are plausible in the current workspace.

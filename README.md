# Soar Design System

Canonical Next.js 15 + Tailwind 4 + shadcn/ui registry for SOAR Connect.

## What's here

- **`components/ui/`** — 9 shadcn primitives mirrored from `soarconnect_frontend/src/components/ui/shadcn/`: Avatar, Badge, Button, Card, Checkbox, Input, Label, Switch, Tabs.
- **`app/globals.css`** — canonical SOAR brand tokens (Cognac & Cream / Orchestrated Connecting palette, EB Garamond + Inter typography, OKLCH color space).
- **`app/page.tsx`** — live showcase of every primitive in light + dark mode. Run `pnpm dev` and open `http://localhost:3000`.
- **`registry.json`** — shadcn registry index defining the 9 components and their dependencies.
- **`scripts/build-registry.ts`** — registry builder. Wired as `prebuild`. Emits `public/r/<name>.json` per component plus `public/r/index.json` for discovery.
- **`lib/utils.ts`** — the standard shadcn `cn()` helper (clsx + tailwind-merge).

## Install

```bash
pnpm install
```

## Develop

```bash
pnpm dev      # http://localhost:3000 — showcase
pnpm build    # runs prebuild → registry:build, then next build
pnpm registry:build   # just rebuild registry artifacts
```

## Consume from another repo

Once this is hosted (Vercel, GitHub Pages, etc.), other SOAR repos can install primitives via the shadcn CLI:

```bash
# From soarconnect_frontend (or any other consumer):
npx shadcn add https://soar-ds.example.com/r/button.json
```

Replace the URL with wherever this app is published.

## Brand tokens

| Token | Light | Dark |
|---|---|---|
| `--primary` | `oklch(0.40 0.14 30)` (burgundy) | `oklch(0.62 0.16 32)` |
| `--accent` | `oklch(0.72 0.16 70)` (gold) | `oklch(0.78 0.16 72)` |
| `--background` | `oklch(0.972 0.012 75)` (cream) | `oklch(0.16 0.04 30)` (mahogany) |
| `--foreground` | `oklch(0.20 0.05 30)` | `oklch(0.96 0.02 75)` |

Full token list in `app/globals.css`. See `SOAR_design_standards.md v11` for the design intent.

## Adding a new component

1. Drop the `.tsx` source into `components/ui/<name>.tsx` (use the shadcn New York style; import `cn` from `@/lib/utils`).
2. Add a corresponding entry to `registry.json`:
   ```json
   {
     "name": "<name>",
     "type": "registry:ui",
     "registryDependencies": [],
     "dependencies": ["@radix-ui/react-<name>"],
     "files": [{ "path": "components/ui/<name>.tsx", "type": "registry:ui" }]
   }
   ```
3. Run `pnpm registry:build` to emit the JSON artifact.
4. Add a usage example to `app/page.tsx`.
5. Commit. Consumers update via `npx shadcn add <url>`.

## Status

Scaffold complete (2026-05-05). Frontend (`soarconnect_frontend`) does not yet consume from this repo — it has its own copies in `src/components/ui/shadcn/`. Migration of frontend imports → this registry is tracked separately (one PR per primitive).

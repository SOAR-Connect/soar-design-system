# Soar Design System

Canonical Next.js 15 + Tailwind 4 + shadcn/ui registry for SOAR Connect.

## What's here

| Layer | Where | What |
|---|---|---|
| Tokens | `app/globals.css` | OKLCH brand palette (Cognac & Cream / Orchestrated Connecting), EB Garamond + Inter typography, radii, semantic status colors |
| Primitives | `components/ui/` | 17 shadcn New York primitives: Avatar, Badge, Button, Card, Checkbox, Dialog, DropdownMenu, Input, Label, Popover, Select, Separator, Sheet, Switch, Tabs, Tooltip, Toaster (Sonner) |
| Patterns | `components/patterns/` | 9 SOAR-specific composed components per `design-standards-v11 §24`: AskRow, ConnectionRow, EmptyState, GroupCoverCard, InboxMessageRow, NotificationItem, SkeletonRow, SoarScoreRing, StatsCard |
| Showcase | `app/page.tsx` | Live showcase of every primitive and pattern (light + dark via `prefers-color-scheme`) |
| Registry | `registry.json` + `scripts/build-registry.ts` | Emits `public/r/<name>.json` per component for shadcn-CLI consumption |
| Figma plugins | `figma-plugins/` | `seed-flows` (FigJam: populate canonical happy paths) and `stub-remover` (Figma design: remove placeholder frames with confirmation) |

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

Once this is hosted (Vercel, GitHub Pages, etc.), other SOAR repos can install primitives or patterns via the shadcn CLI:

```bash
# From soarconnect_frontend (or any other consumer):
npx shadcn add https://soar-ds.example.com/r/button.json
npx shadcn add https://soar-ds.example.com/r/ask-row.json   # patterns work the same way
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

## Adding a new primitive

1. Drop the `.tsx` source into `components/ui/<name>.tsx` (shadcn New York; `cn` from `@/lib/utils`).
2. Add a corresponding entry to `registry.json` (type `registry:ui`).
3. Re-export from `components/ui/index.ts`.
4. Add a usage example to `app/page.tsx`.
5. Run `pnpm registry:build` to emit the JSON artifact.

## Adding a new pattern

Same as a primitive but:
- Place in `components/patterns/<name>.tsx`.
- Use `type: "registry:component"` in `registry.json` (and list `registryDependencies` for any primitives it composes).
- Re-export from `components/patterns/index.ts`.

## Figma plugins

See `figma-plugins/README.md`. Two TypeScript plugins:
- **seed-flows** — populates the blank `Soar-Journey` FigJam with the 7 canonical happy paths from `SOAR_handoff_unified.md`.
- **stub-remover** — scans the Soar-Redesign Figma file for placeholder/empty frames and removes them with explicit per-item confirmation.

## Status

| Item | State |
|---|---|
| Token sync (Cognac & Cream brand) | ✓ |
| 17 primitives | ✓ |
| 9 SOAR patterns | ✓ |
| Showcase page | ✓ |
| Registry build script | ✓ |
| Figma plugins | ✓ |
| Frontend consuming from this repo | not yet — `soarconnect_frontend` keeps its own copies in `src/components/ui/shadcn/`. Per-primitive migration is its own follow-up. |
| Deploy / publish | not yet — local-only. |

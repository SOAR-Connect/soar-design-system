# SOAR — Seed Canonical Flows (FigJam plugin)

Populates the (currently blank) `Soar-Journey` FigJam (`8EqbJPZ2MsN8n18kI54LMU`) with the 7 canonical happy paths from `SOAR_handoff_unified.md`.

## What it creates

A new Section named `SOAR Canonical Flows — <timestamp>` containing:

| Flow | Steps |
|---|---|
| Onboarding | 22 |
| User Profile | 12 |
| Connections | 12 |
| Asks | 5 |
| Inbox | 9 |
| Notifications | 4 |
| Dashboard | 5 |

Each flow is a horizontal row of yellow step stickies (wrapping every 6 steps) connected with elbow arrows in the SOAR primary color.

## How to install / run

1. Open the FigJam file at <https://www.figma.com/board/8EqbJPZ2MsN8n18kI54LMU/Soar-Journey>.
2. **Plugins → Development → Import plugin from manifest…**
3. Select `manifest.json` from this folder.
4. **Plugins → Development → "SOAR — Seed Canonical Flows"** to run.

## Build

The plugin is plain TypeScript. No bundler is required; the Figma plugin runtime can load `code.ts` directly via `tsc`. To produce `code.js`:

```bash
cd figma-plugins/seed-flows
npx tsc code.ts --target es2017 --lib es2017,dom
```

(`code.js` is gitignored so each environment compiles fresh.)

## Re-running

Safe. Each run creates a fresh dated Section; nothing existing is mutated or deleted.

## Customising

Edit the `FLOWS` constant at the top of `code.ts` to adjust steps. Layout constants (`STICKY_W`, `STICKY_H`, etc.) are also at the top.

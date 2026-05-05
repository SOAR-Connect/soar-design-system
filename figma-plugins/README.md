# SOAR Figma Plugins

Two design-tooling plugins that live with the design system.

| Plugin | Target file | Purpose |
|---|---|---|
| [seed-flows](./seed-flows) | FigJam (`8EqbJPZ2MsN8n18kI54LMU` Soar-Journey) | Populates a blank FigJam with the 7 canonical happy-path flows from `SOAR_handoff_unified.md` |
| [stub-remover](./stub-remover) | Figma design (`0u7EjU8sbCqCBmgPN7ufBO` Soar-Redesign) | Scans for placeholder/empty frames and removes them with explicit per-item confirmation |

Both are plain TypeScript Figma plugins (no bundler required). Each folder ships a `manifest.json`, the `code.ts` source, and per-plugin README.

## Build

```bash
cd figma-plugins/seed-flows && npx tsc code.ts --target es2017 --lib es2017,dom
cd figma-plugins/stub-remover && npx tsc code.ts --target es2017 --lib es2017,dom
```

`code.js` outputs are gitignored — each environment compiles fresh.

## Type definitions

The Figma plugin API types are not vendored here. To get IntelliSense:

```bash
pnpm add -D @figma/plugin-typings
```

…or use Figma's official template (`npx create-figma-plugin`) for a fuller dev setup.

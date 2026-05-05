# SOAR — Stub Remover (Figma plugin)

Scans every non-library page of the current Figma file and surfaces frames that look like unfinished placeholders. **Removal is opt-in per item** — the plugin shows a list with checkboxes; you confirm before anything is deleted.

## What counts as a stub

| Heuristic | Examples |
|---|---|
| Empty frame (no children) and area ≥ 100 px² | a `Frame 4647` with nothing inside |
| Auto-named frame (`Frame N`, `Group N`, `Section N`, `Untitled`, `Stub`, `Placeholder`, `WIP`, `TODO`, `TBD`) with ≤ 1 child | scaffolding from a paste/move that never got finished |
| Single-text-child frame whose only text matches `TODO / WIP / STUB / PLACEHOLDER / COMING SOON / LOREM IPSUM` | a designer's note left in production |
| Stub-named frame with only trivial children | a placeholder that contains only more placeholders |

## What's protected (will NOT be flagged)

- Pages whose name matches: `🧩 Library`, `📦 Library`, `Design Tokens`, anything containing `audit` or `test branch`.
- COMPONENT / COMPONENT_SET / INSTANCE nodes (those are intentional).
- Any node that has substantive non-placeholder children.

## How to install / run

1. Open the SOAR-Redesign Figma file (`0u7EjU8sbCqCBmgPN7ufBO`).
2. **Plugins → Development → Import plugin from manifest…**
3. Select `manifest.json` from this folder.
4. **Plugins → Development → "SOAR — Stub Remover"**.
5. The UI shows what was found. Tick the items you want removed; click **Remove selected**.

## Build

```bash
cd figma-plugins/stub-remover
npx tsc code.ts --target es2017 --lib es2017,dom
```

## Safety

- Default flow is non-destructive: scan first, you choose, then apply.
- Each "Apply" run writes a forensic stamp into the document's shared plugin data namespace `soar` (key `soar-stub-removal-<timestamp>`) recording the removed node IDs.
- The plugin never touches remote files; it operates entirely on the currently-open document.
- Figma's standard undo (`Cmd+Z`) reverses removals up to history depth.

## What if the heuristics miss / over-fire?

Edit `STUB_NAME_PATTERNS` and `STUB_TEXT_PATTERNS` at the top of `code.ts`, recompile, and re-run.

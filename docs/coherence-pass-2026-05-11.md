# Design coherence pass — 2026-05-11

Audit and reconciliation of the Soar Redesign Figma file (`0u7EjU8sbCqCBmgPN7ufBO`)
against this repository as the canonical mirror.

## What we found

The Figma file had drifted into incoherence even though the repo had stayed
declarative. Concretely:

| Area | Issue | Resolution |
|---|---|---|
| Fonts | Figma variable said `Inter`; every text style used **Albert Sans**; "mono" styles were not monospace | Repo updated to `EB Garamond` + `Albert Sans` + `JetBrains Mono`; Figma "mono/mono-sm" styles re-bound to actual JetBrains Mono |
| Variable scopes | All 56 variables scoped to `ALL_SCOPES` (pollutes every picker) | Variables re-scoped: color → fill/stroke/text only; radius → corner; space → gap/dimension; font family → font family |
| Text styles | **92 styles** with three parallel typography systems | Collapsed to **20 canonical `text/*` styles** mirroring the repo type ramp |
| Paint styles | 8 legacy paint styles (`White`, `Grey 2`, …) used before variable migration | Documented on a new `_Legacy` page for staged migration |
| Junk | Empty `Collection 1` variable set | Deleted |
| Color `accent` | Set to rose (#a04828) but repo declared amber (#e89b1a) | Resolved: rose stays `--primary`, amber takes `--accent`. Semantics now clean: primary action = rose, highlight/CTA-accent = amber |
| Foundation page | Repo CSS comment claimed sync from `🚀 Foundation`, but values drifted | New `🎨 Design System` page in Figma is the source. CSS comment updated. |
| Radius | `--radius-xs` light value lost from Figma; the dark `0` flip was correct only by accident | Restored canonical `--radius-xs: 4px` in light, `0` in dark |
| Shadow | `--shadow-site` declared in CSS; no matching Figma effect style | Created `shadow/site` effect style in Figma + added `elevation/sm` + `elevation/md` companions |

## What's new

- New Figma page **`🎨 Design System`** — canonical source of truth for tokens & components.
- New Figma page **`_Legacy`** — README explaining what's archived and the migration path.
- 4 new effect styles in Figma (`shadow/site`, `elevation/sm`, `elevation/md`) and a `shadow/color` variable for theming dark-mode shadows in future.
- New Figma component sets: `Button` (12 variants), `Input` (5 states), `Badge` (8 variants), `Card` (3 elevations), all bound to color + radius variables so a single token flip cascades.

## Decisions log

1. **Font canonicality: Figma wins.** The codebase aspirationally declared Fraunces + Geist but no styles ever used them. Easier to update CSS than re-bind every Figma text style.
2. **Color canonicality: hex values stay.** Figma was 1–3% off from the OKLCH-derived hex; we treated repo as authoritative and re-pointed Figma to the canonical hex.
3. **Amber vs. rose: split.** Rose is `--primary` (and `accent-rose` for decoration). Amber is `--accent` (and `accent-amber` and `badge-help`). Same physical hue, different semantic role.
4. **No deletion yet.** Legacy text styles, paint styles, and audit pages live on a `_Legacy` page until every usage is migrated, then deletion is safe.

## Open work

- Cascade tokens to remaining ~340 frames across 33 pages (per-page rebuild work).
- Add Composed + App-Patterns sections to the Design System page (Card → Tabs → Dialog → Sheet → Popover → Dropdown → Table → Toast → TopNav → SideNav).
- Add SwitchCheckbox/RadioGroup/SelectTrigger/Slider primitives.
- Open a follow-up PR with Code Connect mappings from each Figma component to its `components/ui/*.tsx` source.
- Audit and migrate the 8 legacy paint styles by counting current usages and writing a swap script.
- Run WCAG AA spot-check on the new amber `--accent` vs. its foreground on both light and dark.

/**
 * SOAR — Stub Remover (Figma plugin, design files)
 *
 * Scans every page of the current Figma file looking for "stub" frames.
 * A stub is a frame that's most likely an unfinished placeholder rather
 * than a real screen — it's empty, or holds only a "TODO/WIP/PLACEHOLDER"
 * marker, or carries an auto-named title with negligible content.
 *
 * Safety:
 *   - First run is ALWAYS dry-run. The plugin reports what it WOULD remove
 *     and waits for the user to confirm "Apply" before deleting.
 *   - Frames inside Library / Component pages are explicitly skipped — those
 *     pages have intentional empty placeholders for slots.
 *   - Apply step also creates a "soar-stub-removal-<timestamp>" plugin-data
 *     stamp on the deleted node IDs (recorded in plugin shared data on the
 *     document) for forensic traceability.
 *
 * Usage:
 *   Plugins → Development → Import plugin from manifest… → pick this folder.
 *   Then Plugins → Development → "SOAR — Stub Remover".
 *
 * This plugin DOES NOT navigate cross-file or push to remote in any form.
 */

interface StubReport {
  pageName: string;
  pageId: string;
  nodeId: string;
  nodeName: string;
  nodeType: string;
  reason: string;
}

const SKIP_PAGE_PATTERNS: RegExp[] = [
  /^🧩.*library/i,
  /^📦.*library/i,
  /design tokens/i,
  /audit/i,
  /test[-\s]?branch/i,
];

const STUB_NAME_PATTERNS: RegExp[] = [
  /^stub\b/i,
  /^placeholder\b/i,
  /^wip\b/i,
  /^todo\b/i,
  /^tbd\b/i,
  /^untitled/i,
  /^frame \d+$/i,
  /^group \d+$/i,
  /^section \d+$/i,
];

const STUB_TEXT_PATTERNS: RegExp[] = [
  /^(todo|tbd|wip|stub|placeholder|coming soon|lorem ipsum)/i,
];

figma.showUI(__html__, { width: 380, height: 480 });

(async () => {
  await figma.loadAllPagesAsync();
  const report = await scan();
  figma.ui.postMessage({ kind: "scan-result", report });
})();

figma.ui.onmessage = async (msg: { kind: string; ids?: string[] }) => {
  if (msg.kind === "rescan") {
    const report = await scan();
    figma.ui.postMessage({ kind: "scan-result", report });
    return;
  }
  if (msg.kind === "apply" && msg.ids) {
    const removed = await applyRemoval(msg.ids);
    figma.notify(`SOAR: removed ${removed} stub frame(s).`);
    const report = await scan();
    figma.ui.postMessage({ kind: "scan-result", report });
    return;
  }
  if (msg.kind === "close") {
    figma.closePlugin();
  }
};

async function scan(): Promise<StubReport[]> {
  const out: StubReport[] = [];
  for (const page of figma.root.children) {
    if (page.type !== "PAGE") continue;
    if (SKIP_PAGE_PATTERNS.some((p) => p.test(page.name))) continue;
    await page.loadAsync();

    walk(page, (node) => {
      if (node.type !== "FRAME" && node.type !== "SECTION" && node.type !== "GROUP") return;
      const reason = classify(node);
      if (!reason) return;
      out.push({
        pageName: page.name,
        pageId: page.id,
        nodeId: node.id,
        nodeName: node.name,
        nodeType: node.type,
        reason,
      });
    });
  }
  return out;
}

function walk(root: BaseNode, visit: (node: SceneNode) => void) {
  if ("children" in root) {
    for (const child of root.children) {
      visit(child as SceneNode);
      walk(child, visit);
    }
  }
}

function classify(node: SceneNode): string | null {
  // Skip components, instances, library content
  if (node.type === "COMPONENT" || node.type === "COMPONENT_SET" || node.type === "INSTANCE") {
    return null;
  }

  const hasName = node.name && node.name.trim().length > 0;
  const matchesNamePattern = STUB_NAME_PATTERNS.some((p) => p.test(node.name));

  // Empty frame (no children at all)
  if ("children" in node && (node.children?.length ?? 0) === 0) {
    if (hasArea(node) < 100) return null; // tiny utility frames are noise
    return "Empty frame (no children)";
  }

  // Frame with auto-generated name AND only 0–1 trivial children
  if (matchesNamePattern && "children" in node) {
    const children = node.children ?? [];
    if (children.length <= 1) {
      return `Auto-named frame "${node.name}" with ≤1 child`;
    }
  }

  // Frame with single text child whose content matches stub text
  if ("children" in node && (node.children?.length ?? 0) === 1) {
    const only = node.children[0];
    if (only.type === "TEXT" && STUB_TEXT_PATTERNS.some((p) => p.test(only.characters || ""))) {
      return `Single placeholder text: "${(only.characters || "").slice(0, 40)}…"`;
    }
  }

  // Frame named explicitly as stub-ish
  if (matchesNamePattern && (node.type === "FRAME" || node.type === "SECTION")) {
    if ("children" in node) {
      const trivialChildren = node.children.every((c) => isTrivial(c));
      if (trivialChildren) {
        return `Stub-named "${node.name}" with only trivial children`;
      }
    }
  }

  return null;
}

function isTrivial(n: SceneNode): boolean {
  if (n.type === "TEXT") return STUB_TEXT_PATTERNS.some((p) => p.test(n.characters || ""));
  if ("children" in n && (n.children?.length ?? 0) === 0) return true;
  return false;
}

function hasArea(n: SceneNode): number {
  if (!("width" in n) || !("height" in n)) return 0;
  return (n.width || 0) * (n.height || 0);
}

async function applyRemoval(ids: string[]): Promise<number> {
  let removed = 0;
  const stamp = new Date().toISOString();
  const stampKey = `soar-stub-removal-${stamp}`;
  const stampValue = JSON.stringify({ count: ids.length, ids: ids.slice() });
  figma.root.setSharedPluginData("soar", stampKey, stampValue);

  for (const id of ids) {
    const node = await figma.getNodeByIdAsync(id);
    if (!node) continue;
    if ("remove" in node) {
      (node as SceneNode).remove();
      removed++;
    }
  }
  return removed;
}

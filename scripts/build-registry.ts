/**
 * SOAR DS — registry builder.
 *
 * Reads `registry.json` (the canonical index of components) and emits one
 * JSON artifact per component into `public/r/<name>.json`. Consumers can
 * `npx shadcn add http://soar-ds.example.com/r/<name>.json` to install.
 *
 * This is intentionally simple — no compilation, just JSON shaping. shadcn's
 * CLI is the consumer; it handles file copy, dependency install, and import
 * path rewriting. Our job is to publish the raw component source + metadata
 * in the shape the CLI expects.
 *
 * Run: pnpm registry:build (also wired as prebuild).
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";

type RegistryItem = {
  name: string;
  type: string;
  registryDependencies?: string[];
  dependencies?: string[];
  files: { path: string; type: string }[];
};

type Registry = {
  $schema?: string;
  name: string;
  homepage?: string;
  items: RegistryItem[];
};

const ROOT = process.cwd();
const REGISTRY_PATH = join(ROOT, "registry.json");
const OUT_DIR = join(ROOT, "public", "r");

function main() {
  if (!existsSync(REGISTRY_PATH)) {
    throw new Error(`registry.json not found at ${REGISTRY_PATH}`);
  }

  const registry: Registry = JSON.parse(readFileSync(REGISTRY_PATH, "utf-8"));
  mkdirSync(OUT_DIR, { recursive: true });

  for (const item of registry.items) {
    const filesWithContent = item.files.map((f) => {
      const sourcePath = join(ROOT, f.path);
      const content = readFileSync(sourcePath, "utf-8");
      return { ...f, content, target: f.path };
    });

    const out = {
      $schema: "https://ui.shadcn.com/schema/registry-item.json",
      name: item.name,
      type: item.type,
      registryDependencies: item.registryDependencies ?? [],
      dependencies: item.dependencies ?? [],
      files: filesWithContent,
    };

    const outPath = join(OUT_DIR, `${item.name}.json`);
    mkdirSync(dirname(outPath), { recursive: true });
    writeFileSync(outPath, JSON.stringify(out, null, 2) + "\n");
    console.log(`✓ built ${item.name} → public/r/${item.name}.json`);
  }

  // Emit the index so consumers can discover everything.
  const indexPath = join(OUT_DIR, "index.json");
  writeFileSync(
    indexPath,
    JSON.stringify(
      {
        $schema: registry.$schema,
        name: registry.name,
        homepage: registry.homepage,
        items: registry.items.map((i) => ({ name: i.name, type: i.type })),
      },
      null,
      2,
    ) + "\n",
  );
  console.log(`✓ built index → public/r/index.json (${registry.items.length} items)`);
}

main();

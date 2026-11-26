// Five Seconds to Explain the Glass — the cat's defence, one sentence.
// Writes the entry to $MAKEFUN_OUTPUT_DIR/entry.txt (default /output).
// The line is checked against the gate before it is written: one sentence,
// 1–200 characters, in the cat's own voice — no apology, no confession.
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = dirname(dirname(fileURLToPath(import.meta.url)));
void repoRoot;

const ENTRY =
  "The glass was staring at me first \u2014 I was defending my territory.";

// Gate self-check: a single sentence (one terminal period) of 1–200 chars.
if (ENTRY.length < 1 || ENTRY.length > 200) {
  throw new Error(`entry is ${ENTRY.length} characters, gate needs 1-200`);
}
if ((ENTRY.match(/\./g) ?? []).length !== 1 || !ENTRY.endsWith(".")) {
  throw new Error("entry must be exactly one sentence");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");

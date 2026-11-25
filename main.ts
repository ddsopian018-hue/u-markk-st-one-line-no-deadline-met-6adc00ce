// One Line, No Deadline Met — make.fun entry
// Writes one fixed single-line joke giving an excuse for a missed deadline.
// Pure Node.js stdlib, no dependencies, no network, no randomness:
// the same line is written on every run, byte for byte.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The excuse: a setup-then-confession turn — everything was ready except
// the actual work, and the punch ("I had never actually started") lands at
// the very end, exactly how a cornered person would blurt it out.
const LINE =
  "My alarm went off, my laptop charged, my notes were ready — and then I remembered I had never actually started.";

function writeEntry(outDir: string): void {
  const line = LINE;
  if (line.trim().length === 0) {
    throw new Error("entry line must not be blank");
  }
  if (line.length < 1 || line.length > 200) {
    throw new Error(`entry line must be 1-200 characters, got ${line.length}`);
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("entry line must be a single line");
  }
  mkdirSync(outDir, { recursive: true });
  // No trailing newline: the file is the line and nothing else.
  writeFileSync(join(outDir, "entry.txt"), line, "utf8");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
writeEntry(outDir);

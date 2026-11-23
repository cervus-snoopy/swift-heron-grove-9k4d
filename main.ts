import { chmodSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, isAbsolute, join } from "node:path";
import { fileURLToPath } from "node:url";

// All paths resolve from this file's location (import.meta.url), never from process.cwd().
const scriptDir = dirname(fileURLToPath(import.meta.url));

const rawOut = process.env.MAKEFUN_OUTPUT_DIR;
const outDir =
  rawOut === undefined || rawOut === ""
    ? "/output"
    : isAbsolute(rawOut)
      ? rawOut
      : join(scriptDir, rawOut);

const joke =
  "My AI agent fixed the bug by deleting the feature, then wrote a changelog calling it a performance improvement — and the users agreed.";

mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, joke, { encoding: "utf8", mode: 0o644 });
chmodSync(outPath, 0o644);

import { cpSync, existsSync, rmSync } from "node:fs";
import { resolve } from "node:path";

const source = resolve("out");
const destination = resolve("dist");

if (!existsSync(source)) {
  throw new Error("Static export directory was not generated.");
}

rmSync(destination, { recursive: true, force: true });
cpSync(source, destination, { recursive: true });

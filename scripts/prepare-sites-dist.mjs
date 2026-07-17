import { cpSync, existsSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const source = resolve("out");
const destination = resolve("dist");

if (!existsSync(source)) {
  throw new Error("Static export directory was not generated.");
}

rmSync(destination, { recursive: true, force: true });
cpSync(source, destination, { recursive: true });

mkdirSync(resolve(destination, "server"), { recursive: true });
writeFileSync(
  resolve(destination, "server", "index.js"),
  `export default {
  async fetch(request, env) {
    return env.ASSETS.fetch(request);
  },
};
`,
);

mkdirSync(resolve(destination, ".openai"), { recursive: true });
cpSync(resolve(".openai", "hosting.json"), resolve(destination, ".openai", "hosting.json"));

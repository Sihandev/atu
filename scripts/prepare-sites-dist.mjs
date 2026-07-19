import { cpSync, existsSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const source = resolve(".site-out");
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
    if (request.method !== "GET" && request.method !== "HEAD") {
      return new Response("Method Not Allowed", { status: 405 });
    }

    const url = new URL(request.url);
    const pathname = decodeURIComponent(url.pathname);
    const hasExtension = /\\.[^/]+$/.test(pathname);
    const candidates = hasExtension
      ? [pathname]
      : pathname === "/"
        ? ["/index.html"]
        : [
            pathname + ".html",
            pathname.replace(/\\/$/, "") + "/index.html",
          ];

    for (const candidate of candidates) {
      const assetUrl = new URL(request.url);
      assetUrl.pathname = candidate;
      const response = await env.ASSETS.fetch(
        new Request(assetUrl, { method: request.method, headers: request.headers }),
      );

      if (response.status !== 404) {
        return response;
      }
    }

    const notFoundUrl = new URL("/404.html", request.url);
    const notFound = await env.ASSETS.fetch(
      new Request(notFoundUrl, { method: request.method, headers: request.headers }),
    );

    return new Response(notFound.body, {
      status: 404,
      headers: notFound.headers,
    });
  },
};
`,
);

mkdirSync(resolve(destination, ".openai"), { recursive: true });
cpSync(resolve(".openai", "hosting.json"), resolve(destination, ".openai", "hosting.json"));

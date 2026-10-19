// Serves the prerendered build like a static host would. Used by `npm run preview` and Playwright.
import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import { createServer } from "node:http";
import { extname, join, normalize, resolve, sep } from "node:path";
import { parseArgs } from "node:util";

const { values } = parseArgs({
  options: { port: { type: "string", default: "4173" } },
});

const root = resolve(import.meta.dirname, "../build/client");
const spaFallback = join(root, "__spa-fallback.html");

const contentTypes = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".woff2": "font/woff2",
};

async function isFile(path) {
  try {
    return (await stat(path)).isFile();
  } catch {
    return false;
  }
}

async function resolveFile(pathname) {
  const target = normalize(join(root, decodeURIComponent(pathname)));
  if (target !== root && !target.startsWith(root + sep)) {
    return null;
  }
  for (const candidate of [target, join(target, "index.html"), `${target}.html`]) {
    if (await isFile(candidate)) {
      return candidate;
    }
  }
  return null;
}

function send(res, status, file) {
  res.writeHead(status, {
    "Content-Type": contentTypes[extname(file)] ?? "application/octet-stream",
  });
  createReadStream(file).pipe(res);
}

createServer(async (req, res) => {
  try {
    const { pathname } = new URL(req.url ?? "/", "http://localhost");
    const file = await resolveFile(pathname);
    if (file) {
      send(res, 200, file);
    } else if (await isFile(spaFallback)) {
      send(res, 404, spaFallback);
    } else {
      res.writeHead(404).end();
    }
  } catch {
    res.writeHead(400).end();
  }
}).listen(Number(values.port), "127.0.0.1", () => {
  console.log(`Serving ${root} on http://127.0.0.1:${values.port}`);
});

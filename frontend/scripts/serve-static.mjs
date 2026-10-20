// Serves the prerendered build like a static host would. Used by `npm run preview` and Playwright.
import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import { createServer } from "node:http";
import { extname, join, normalize, resolve, sep } from "node:path";
import { parseArgs } from "node:util";
import { createGzip } from "node:zlib";

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
  ".mp4": "video/mp4",
  ".webm": "video/webm",
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

const compressible = new Set([".html", ".js", ".css", ".json", ".txt", ".xml", ".svg"]);

/** Byte ranges, as browsers request them for video. */
async function sendRange(req, res, file, headers) {
  const { size } = await stat(file);
  const match = /^bytes=(\d*)-(\d*)$/.exec(req.headers.range ?? "");
  const start = match?.[1] ? Number(match[1]) : size - Number(match?.[2] ?? 0);
  const end = match?.[1] && match[2] ? Math.min(Number(match[2]), size - 1) : size - 1;
  if (!match || start > end || start < 0) {
    res.writeHead(416, { "Content-Range": `bytes */${size}` }).end();
    return;
  }
  res.writeHead(206, {
    ...headers,
    "Accept-Ranges": "bytes",
    "Content-Range": `bytes ${start}-${end}/${size}`,
    "Content-Length": end - start + 1,
  });
  createReadStream(file, { start, end }).pipe(res);
}

function send(req, res, status, file) {
  const headers = {
    "Content-Type": contentTypes[extname(file)] ?? "application/octet-stream",
    Vary: "Accept-Encoding",
  };
  if (status === 200 && req.headers.range) {
    void sendRange(req, res, file, headers);
    return;
  }
  const gzip =
    compressible.has(extname(file)) && /\bgzip\b/.test(req.headers["accept-encoding"] ?? "");
  if (gzip) {
    res.writeHead(status, { ...headers, "Content-Encoding": "gzip" });
    createReadStream(file).pipe(createGzip()).pipe(res);
  } else {
    res.writeHead(status, { ...headers, "Accept-Ranges": "bytes" });
    createReadStream(file).pipe(res);
  }
}

createServer(async (req, res) => {
  try {
    const { pathname } = new URL(req.url ?? "/", "http://localhost");
    const file = await resolveFile(pathname);
    if (file) {
      send(req, res, 200, file);
    } else if (await isFile(spaFallback)) {
      send(req, res, 404, spaFallback);
    } else {
      res.writeHead(404).end();
    }
  } catch {
    res.writeHead(400).end();
  }
}).listen(Number(values.port), "127.0.0.1", () => {
  console.log(`Serving ${root} on http://127.0.0.1:${values.port}`);
});

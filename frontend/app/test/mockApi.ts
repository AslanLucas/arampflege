import { vi } from "vitest";

type Handler = (body: unknown) => Response | Promise<Response>;

export type ApiCall = {
  route: string;
  body: unknown;
};

export function jsonResponse(status: number, data?: unknown): Response {
  return new Response(data === undefined ? null : JSON.stringify(data), {
    status,
    headers: { "content-type": "application/problem+json" },
  });
}

export type UploadedFile = {
  name: string;
  size: number;
  type: string;
};

// Request.formData() cannot be used here: in the jsdom environment Node's multipart parser
// collides with jsdom's File class. The test only needs field values and file metadata.
function parseMultipart(body: string, boundary: string): Record<string, string | UploadedFile> {
  const fields: Record<string, string | UploadedFile> = {};
  for (const part of body.split(`--${boundary}`)) {
    const separator = part.indexOf("\r\n\r\n");
    if (separator === -1) {
      continue;
    }
    const headers = part.slice(0, separator);
    const content = part.slice(separator + 4).replace(/\r\n$/, "");
    const name = /name="([^"]*)"/.exec(headers)?.[1];
    if (!name) {
      continue;
    }
    const fileName = /filename="([^"]*)"/.exec(headers)?.[1];
    fields[name] =
      fileName === undefined
        ? content
        : {
            name: fileName,
            size: new TextEncoder().encode(content).length,
            type: /Content-Type: (.+)/i.exec(headers)?.[1]?.trim() ?? "",
          };
  }
  return fields;
}

async function readBody(request: Request): Promise<unknown> {
  if (request.method === "GET") {
    return undefined;
  }
  const boundary = /boundary=(.+)$/.exec(request.headers.get("content-type") ?? "")?.[1];
  if (boundary) {
    return parseMultipart(await request.text(), boundary);
  }
  const text = await request.text();
  return text ? (JSON.parse(text) as unknown) : undefined;
}

/** Replaces fetch with handlers keyed by "METHOD /path" and records every call. */
export function mockApi(handlers: Record<string, Handler>) {
  const calls: ApiCall[] = [];

  vi.stubGlobal(
    "fetch",
    vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
      const request = input instanceof Request ? input : new Request(input, init);
      const route = `${request.method} ${new URL(request.url).pathname}`;
      const body = await readBody(request);
      calls.push({ route, body });

      const handler = handlers[route];
      return handler ? handler(body) : jsonResponse(404);
    }),
  );

  return {
    calls,
    count: (route: string) => calls.filter((call) => call.route === route).length,
  };
}

export const formTokenHandler = {
  "GET /api/form-tokens": () => jsonResponse(200, { token: "test-token" }),
};

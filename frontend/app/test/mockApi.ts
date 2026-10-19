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

/** Replaces fetch with handlers keyed by "METHOD /path" and records every call. */
export function mockApi(handlers: Record<string, Handler>) {
  const calls: ApiCall[] = [];

  vi.stubGlobal(
    "fetch",
    vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
      const request = input instanceof Request ? input : new Request(input, init);
      const route = `${request.method} ${new URL(request.url).pathname}`;
      const text = request.method === "GET" ? "" : await request.text();
      const body: unknown = text ? JSON.parse(text) : undefined;
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

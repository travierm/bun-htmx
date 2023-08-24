import React from "react";
import { renderToReadableStream, renderToString } from "react-dom/server";

export async function renderComponent(
  component: React.ReactElement,
  request: Request
) {
  if (!request.headers.get("Hx-Boosted")) {
    const publicHtml = await Bun.file("./public.html").text();
    const resp = renderToString(component);

    return new Response(publicHtml.replace("@content", resp), {
      headers: { "Content-Type": "text/html" },
    });
  }

  const mergedElement = React.cloneElement(component, {
    request,
  });

  const stream = await renderToReadableStream(mergedElement);

  return new Response(stream, {
    headers: { "Content-Type": "text/html" },
  });
}

export class Router {
  routes: { [key: string]: (req: Request) => Promise<Response> } = {};

  routeToComponent(path: string, component: React.ReactElement) {
    this.routes[path] = (req: Request) => {
      return renderComponent(component, req);
    };
  }

  run(path: string, request: Request): Promise<Response> {
    const route = this.routes[path];

    if (route) {
      return route(request);
    }

    return Promise.resolve(new Response("Route not found"));
  }
}

import { request } from "http";
import React from "react";
import { renderToReadableStream, renderToString } from "react-dom/server";

export async function renderComponent(component, request: Request) {
  if (!request.headers.get("Hx-Boosted")) {
    console.log("not boosted");

    const publicHtml = await Bun.file("./public.html").text();
    const resp = await renderToString(component);

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

  routeToComponent(path: string, component: any) {
    this.routes[path] = (req: Request) => {
      return renderComponent(component, req);
    };
  }

  run(path: string, request: Request): Promise<Response> {
    const route = this.routes[path];

    if (route) {
      return route(request);
    }

    return new Response("Route not found");
  }
}

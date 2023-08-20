import { renderToReadableStream } from "react-dom/server";

export async function renderComponent(component) {
  const stream = await renderToReadableStream(component);

  return new Response(stream, {
    headers: { "Content-Type": "text/html" },
  });
}

export class Router {
  routes: { [key: string]: () => Promise<Response> } = {};

  routeToComponent(path: string, component: any) {
    this.routes[path] = () => {
      return renderComponent(component);
    };
  }

  run(path: string): Promise<Response> {
    const route = this.routes[path];

    if (route) {
      console.log("did this");
      return route();
    }

    return new Response("Route not found");
  }
}

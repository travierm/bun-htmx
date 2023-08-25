export default class Router {
  routeMap: Map<string, RequestHandler> = new Map();
  constructor() {}

  get(path: string, handler: RequestHandler) {
    const key = `GET|${path}`;
    this.routeMap.set(key, handler);
  }

  post(path: string, handler: RequestHandler) {
    const key = `POST|${path}`;
    this.routeMap.set(key, handler);
  }

  serve(req: Request) {
    const url = new URL(req.url);

    const routeKey = `${req.method.toUpperCase()}|${url.pathname}`;
    const route = this.routeMap.get(routeKey);

    if (!route) {
      console.error("Could not find route by key " + routeKey);

      return Promise.resolve(
        new Response("Not Found", {
          status: 404,
        })
      );
    }

    return route(req);
  }
}

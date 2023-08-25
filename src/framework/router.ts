export default class Router {
  routeMap: Map<string, RequestHandler> = new Map();

  get(path: string, handler: RequestHandler) {
    const key = `GET|${path}`;
    this.routeMap.set(key, handler);
  }

  post(path: string, handler: RequestHandler) {
    const key = `POST|${path}`;
    this.routeMap.set(key, handler);
  }

  put(path: string, handler: RequestHandler) {
    const key = `PUT|${path}`;
    this.routeMap.set(key, handler);
  }

  patch(path: string, handler: RequestHandler) {
    const key = `PATCH|${path}`;
    this.routeMap.set(key, handler);
  }

  delete(path: string, handler: RequestHandler) {
    const key = `DELETE|${path}`;
    this.routeMap.set(key, handler);
  }

  getRoutes() {
    return this.routeMap;
  }

  /**
   * Matches the incoming request to a route based on the request method and url pathname.
   * @private
   */
  private matchRoute(req: Request) {
    const url = new URL(req.url);

    const routeKey = `${req.method.toUpperCase()}|${url.pathname}`;
    const route = this.routeMap.get(routeKey);

    if (!route) {
      console.error("Could not find route by key " + routeKey);
      return null;
    }

    return route;
  }

  /**
   * Handles the incoming request by matching it to a route and executing the associated handler.
   */
  serve(req: Request) {
    const route = this.matchRoute(req);

    if (!route) {
      return Promise.resolve(
        new Response("Not Found", {
          status: 404,
        })
      );
    }

    return route(req);
  }
}

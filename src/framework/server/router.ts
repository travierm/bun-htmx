import { timer } from "../utils/timer";
import { RadixTree } from "./radixTree";

type RequestHandler = (req: Request) => Promise<Response>;

export default class Router {
  routerTree = new RadixTree();
  routeMap: Map<string, RequestHandler> = new Map();

  get(path: string, handler: RequestHandler) {
    const key = `GET|${path}`;
    this.routeMap.set(key, handler);
    this.routerTree.insert(key, handler);
  }

  post(path: string, handler: RequestHandler) {
    const key = `POST|${path}`;
    this.routeMap.set(key, handler);
    this.routerTree.insert(key, handler);
  }

  put(path: string, handler: RequestHandler) {
    const key = `PUT|${path}`;
    this.routeMap.set(key, handler);
    this.routerTree.insert(key, handler);
  }

  patch(path: string, handler: RequestHandler) {
    const key = `PATCH|${path}`;
    this.routeMap.set(key, handler);
    this.routerTree.insert(key, handler);
  }

  delete(path: string, handler: RequestHandler) {
    const key = `DELETE|${path}`;
    this.routeMap.set(key, handler);
    this.routerTree.insert(key, handler);
  }

  getRoutes() {
    return this.routeMap;
  }

  addExternalRouter(router: Router, prefixPath?: string) {
    const routerRoutes = router.getRoutes();
    const currentRouterRoutes = this.routerTree;
    const path = prefixPath || "";


    // Add routs to the current router's routes with the specified prefix path
    routerRoutes.forEach((handler, key) => {
      this.routeMap.set(`${path + key}`, handler);
      currentRouterRoutes.insert(`${path + key}`, handler);
    });
  }

  /**
   * Matches the incoming request to a route based on the request method and url pathname.
   * @private
   */
  private matchRoute(req: Request) {
    const routeKey = req.method.toUpperCase() + "|" + req.path.pathname;
    const route = this.routerTree.search(routeKey);

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
    req.path = new URL(req.url);
    const matchedRoute = this.matchRoute(req);

    if (!matchedRoute?.handler) {
      return Promise.resolve(
        new Response("Not Found", {
          status: 404,
        })
      );
    }
    
    req.params = matchedRoute.params;
    return matchedRoute.handler(req);
  }
}

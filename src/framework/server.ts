import Router from "./router";
import { Server as BunServer, ServeOptions } from "bun";

export type ListenOptions = Omit<ServeOptions, "fetch">;
export type UseRouterParams = { prefixPath?: string; router: Router };

// Make TypeScript happy
declare global {
  var server: BunServer;
}

export default class Server {
  router: Router;

  constructor() {
    this.router = new Router();
  }

  /**
   * Start the server and listening for incoming requests
   */
  listen(options: ListenOptions) {
    const router = this.router;

    // Override fetch method to use the router's serve method
    const serverOptions = {
      ...options,
      fetch(req: Request): Promise<Response> {
        return router.serve(req);
      },
    };

    // Support hot reloading using Bun's reload method
    if (!globalThis.server) {
      globalThis.server = Bun.serve(serverOptions);
    } else {
      globalThis.server.reload(serverOptions);
    }
  }

  /**
   * Add routes from another router instance
   */
  useRouter(opts: UseRouterParams) {
    const routerRoutes = opts.router.getRoutes();
    const currentRouterRoutes = this.router.getRoutes();
    const path = opts.prefixPath || "";

    // Add routs to the current router's routes with the specified prefix path
    routerRoutes.forEach((handler, key) => {
      currentRouterRoutes.set(`${path + key}`, handler);
    });
  }

  printRoutes() {
    const routes = this.router.getRoutes();
    const routesByPath = new Map<string, string[]>();

    // Group routes by path
    routes.forEach((_, key) => {
      const [method, path] = key.split("|");

      if (routesByPath.has(path)) {
        routesByPath.get(path)?.push(method);
      } else {
        routesByPath.set(path, [method]);
      }
    });

    console.group("Routes");
    routesByPath.forEach((methods, path) => {
      const pathMethods = methods.join(",");
      console.log(`{${pathMethods}} -`, path);
    });
    console.groupEnd();
  }
}

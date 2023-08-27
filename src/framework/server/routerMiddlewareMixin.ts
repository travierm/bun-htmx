type Constructor<T = {}> = new (...args: any[]) => T;
type Middleware = (req: Request) => Promise<Request>;

export type RouterMiddleware = {};

export function RouterMiddlewareMixin<T extends Constructor>(Base: T) {
  return class extends Base {
    middlewareMap: Map<string, Array<Middleware>> = new Map();
    pendingMiddleware: Array<Middleware> = [];
    globalMiddleware: Array<Middleware> = [];

    use(middleware: Middleware) {
      this.globalMiddleware.push(middleware);
    }

    group(middleware: Array<Middleware>, callback: () => void) {
      this.pendingMiddleware = middleware;
      callback();
      this.pendingMiddleware = [];
    }

    registerRouteMiddleware(key: string) {
      if (this.pendingMiddleware.length > 0) {
        this.middlewareMap.set(key, this.pendingMiddleware);
      }
    }

    applyMiddleware(key: string, req: Request) {
      // apply global middleware first
      this.globalMiddleware.forEach(async (fn) => await fn(req));

      const middleware = this.middlewareMap.get(key);
      if (middleware) {
        middleware.forEach(async (fn) => await fn(req));
      }

      return {
        req,
      };
    }
  };
}

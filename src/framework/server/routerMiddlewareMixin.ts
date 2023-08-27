type Constructor<T = {}> = new (...args: any[]) => T;

export type Middleware = (
  req: Request,
  Res: Response,
  next: () => void
) => void;
export type RouterMiddleware = {};

let nextCheck: boolean = false;
let pendingMiddleware: Array<Middleware> = [];
let globalMiddleware: Array<Middleware> = [];
let middlewareMap: Map<string, Array<Middleware>> = new Map();

export function RouterMiddlewareMixin<T extends Constructor>(Base: T) {
  return class extends Base {
    use(middleware: Middleware) {
      globalMiddleware.push(middleware);
    }

    group(middleware: Array<Middleware>, callback: () => void) {
      pendingMiddleware = middleware;
      callback();
      pendingMiddleware = [];
    }

    registerRouteMiddleware(key: string) {
      if (pendingMiddleware.length > 0) {
        middlewareMap.set(key, pendingMiddleware);
      }
    }

    next() {
      nextCheck = true;
    }

    async applyMiddleware(key: string, req: Request, res: Response) {
      let endedResponse: boolean = false;
      const middleware = middlewareMap.get(key) || [];

      for (const fn of globalMiddleware) {
        nextCheck = false;

        await fn(req, res, this.next);

        if (nextCheck === false) {
          return { req, endedResponse: true };
        }
      }

      for (const fn of middleware) {
        nextCheck = false;
        await fn(req, res, this.next);

        if (nextCheck === false) {
          return { req, endedResponse: true };
        }
      }

      return { req, res, endedResponse };
    }
  };
}

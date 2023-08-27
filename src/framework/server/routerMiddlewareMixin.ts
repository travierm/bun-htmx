type Constructor<T = {}> = new (...args: any[]) => T;

export type Middleware = (
  req: Request,
  Res: Response,
  next: () => void
) => void;
export type RouterMiddleware = {};

export function RouterMiddlewareMixin<T extends Constructor>(Base: T) {
  return class extends Base {
    pendingMiddleware: Array<Middleware> = [];
    globalMiddleware: Array<Middleware> = [];
    middlewareMap: Map<string, Array<Middleware>> = new Map();
    nextCheck: boolean = false;

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

    next() {
      this.nextCheck = true;
    }

    async applyMiddleware(key: string, req: Request, res: Response) {
      let endedResponse: boolean = false;
      const middleware = this.middlewareMap.get(key) || [];

      for (const fn of this.globalMiddleware) {
        this.nextCheck = false;
        await fn(req, res, this.next.bind(this));

        if (this.nextCheck === false) {
          return { req, res, endedResponse: true };
        }
      }

      for (const fn of middleware) {
        this.nextCheck = false;
        await fn(req, res, this.next.bind(this));

        if (this.nextCheck === false) {
          return { req, res, endedResponse: true };
        }
      }

      return { req, res, endedResponse };
    }
  };
}

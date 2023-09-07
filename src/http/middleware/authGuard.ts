import { MiddlewareHandler } from "hono";
import { getCookie } from "hono/cookie";

export type User = {
  id: number;
  username: string;
};

// declare global {
//   interface Request {
//     user: User | null;
//   }
// }

const unAuthedPaths = ["/login", "/ping"];

export const authGuard = (): MiddlewareHandler => {
  return async (c, next) => {
    // Unauthed route we should let the request continue without changes
    if (c.req.url && unAuthedPaths.includes(c.req.url)) {
      return next();
    }

    const token = getCookie(c, "token");
    if (!token) {
      // no token on authed router
      return c.redirect("/login");
    }

    c.set;
  };
};

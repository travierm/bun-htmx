import { Hono } from "hono";
import { serveStatic } from "hono/bun";

export function initAssetRoutes(app: Hono) {
  app.use("/public/app.css", serveStatic({ path: "./public/app.css" }));
}

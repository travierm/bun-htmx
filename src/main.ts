import { Hono } from "hono";

import { initAssetRoutes } from "./routers/assetRouter";
import { initControllerRoutes } from "./routers/controllerRouter";

const ENV_PORT = 4000;
const ENV_HOSTNAME = "localhost";

const app = new Hono();

initControllerRoutes(app);
initAssetRoutes(app);

//console.log(`bun-htmx running at http://${ENV_HOSTNAME}:${ENV_PORT}`);

export default {
  port: ENV_PORT, // @ts-ignore
  fetch: app.fetch, // @ts-ignore
};

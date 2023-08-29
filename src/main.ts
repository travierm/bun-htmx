import { Hono } from "hono";

import { initAssetRoutes } from "./routers/assetRouter";
import { initControllerRoutes } from "./routers/controllerRouter";

const app = new Hono();

initControllerRoutes(app);
initAssetRoutes(app);

//console.log(`bun-htmx running at http://${ENV_HOSTNAME}:${ENV_PORT}`);
export default app;

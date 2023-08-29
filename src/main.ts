import { Hono } from "hono";
import { logger } from "hono/logger";
import { secureHeaders } from "hono/secure-headers";

import { initAssetRoutes } from "./routers/assetRouter";
import { initControllerRoutes } from "./routers/controllerRouter";

const app = new Hono();

app.get("*", secureHeaders());
app.use("*", logger());
initControllerRoutes(app);
initAssetRoutes(app);

//console.log(`bun-htmx running at http://${ENV_HOSTNAME}:${ENV_PORT}`);
export default app;

import { Hono } from "hono";

import { AppController } from "../controllers/AppController";
import { AuthController } from "../controllers/AuthController";
import { CustomerController } from "../controllers/CustomerController";
import { OrderController } from "../controllers/OrderController";
import { htmlParser } from "../framework/renderer/parseHtml";

const controllers = {
  AppController: new AppController(),
  AuthController: new AuthController(),
  CustomerController: new CustomerController(),
  OrderController: new OrderController(),
};

await htmlParser.parse("./public/index.html");

export function initControllerRoutes(app: Hono) {
  app.use("*", async (c, next) => {
    await next();

    // currently need to manually exclude urls that should not be parsed
    if (c.req.path.indexOf("/public") === 0) {
      return;
    }

    if (!c.req.headers.get("Hx-Boosted")) {
      if (c.res.body && c.res.status === 200) {
        const reader = c.res.body.getReader();
        const { done, value } = await reader.read();
        reader.releaseLock();
        const result = new TextDecoder().decode(value);
        if (result) {
          const content = htmlParser.injectContent(result);
          c.res = c.newResponse(content, 200);
        }
      }
    }
  });

  app.get("/", controllers.AppController.getIndex);
  app.get("/customers", controllers.CustomerController.getCustomers);
  app.get("/orders", controllers.OrderController.getOrders);
  app.get("/login", controllers.AuthController.getLogin);
  app.get("/ping", async (req) => {
    return new Response("pong", { status: 200 });
  });
}

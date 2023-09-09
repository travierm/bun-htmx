import { Hono } from "hono";

import { htmlParser } from "../../framework/renderer/parseHtml";
import { AppController } from "../controllers/AppController";
import { AuthController } from "../controllers/AuthController";
import { CustomerController } from "../controllers/CustomerController";
import { OrderController } from "../controllers/OrderController";

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
        const result = await c.res.text();
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
  app.post(
    "/login",
    controllers.AuthController.postLogin.bind(controllers.AuthController)
  );

  app.get(
    "/logout",
    controllers.AuthController.getLogout.bind(controllers.AuthController)
  );
  app.get("/ping", async (req) => {
    return new Response("pong", { status: 200 });
  });
}

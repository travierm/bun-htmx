import { AppController } from "./controllers/AppController";
import { AuthController } from "./controllers/AuthController";
import { CustomerController } from "./controllers/CustomerController";
import { OrderController } from "./controllers/OrderController";
import Router from "./framework/server/router";

const controllers = {
  AppController: new AppController(),
  AuthController: new AuthController(),
  CustomerController: new CustomerController(),
  OrderController: new OrderController(),
};

export const router = new Router();

// non-authed
router.get("/", controllers.AppController.getIndex);
router.get("/public/app.css", controllers.AppController.getAppCss);
router.get("/login", controllers.AuthController.getLogin);

// authed
router.group([], () => {
  router.get("/customers", controllers.CustomerController.getCustomers);
  router.get("/orders", controllers.OrderController.getOrders);
  router.get("/ping", async (req) => {
    return new Response("pong", { status: 200 });
  });
});

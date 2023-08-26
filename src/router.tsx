import { renderComponent } from "./framework/renderer/renderComponent";
import Router from "./framework/server/router";
import Customers from "./pages/Login";
import { Navbar } from "./pages/Navbar";
import { Orders } from "./pages/Orders";
import { User } from "./pages/User";

export const router = new Router();

const cssFile = await Bun.file("./public/app.css").text();

router.get("/", async (req) => {
  return renderComponent(req, <Navbar />);
});

router.get("/public/app.css", async () => {
  return new Response(cssFile, {
    headers: { "Content-Type": "text/css" },
  });
});

router.get("/login", (req) => {
  return renderComponent(req, <Login />);
});

router.get("/orders", (req) => {
  return renderComponent(req, <Orders message="Hello from server!" />);
});

router.get("/customers", (req) => {
  return renderComponent(req, <Customers />);
});

router.get("/users/:userId", (req) => {
  return renderComponent(req, <User />);
});

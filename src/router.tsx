import { renderToString } from "react-dom/server";

import { UserList } from "./pages/Customers";
import Customers from "./pages/Login";
import Router from "./framework/server/router";
import { Navbar } from "./pages/Navbar";
import { User } from "./pages/User";
import { renderComponent } from "./framework/renderer/renderComponent";
import { Orders } from "./pages/Orders";


export const router = new Router();

const cssFile = await Bun.file("./public/app.css").text();

router.get("/", async (req) => {
  return renderComponent(req, <Navbar />)
});

router.get("/dist/app.css", async () => {
  return new Response(cssFile, {
    headers: { "Content-Type": "text/css" },
  });
});

router.get("/login", (req) => {
  return renderComponent(req, <Customers />);
});

router.get("/about", (req) => {
  return renderComponent(req, <Orders message="Hello from server!" />);
});

router.get("/users", (req) => {
  return renderComponent(req, <UserList />);
});

router.get("/users/:userId", (req) => {
  return renderComponent(req, <User />);
});
import * as React from "react";
import { renderToString } from "react-dom/server";

import { renderComponent } from "./framework";
import Router from "./framework/router";
import { UserList } from "./pages/Customers";
import Customers from "./pages/Login";
import { Navbar } from "./pages/Navbar";
import { User } from "./pages/User";


export const router = new Router();

router.get("/", async (req) => {
  const publicHtml = await Bun.file("./public/index.html").text();
  const component = await renderToString(<Navbar />);

  return new Response(publicHtml.replace("@content", component), {
    headers: { "Content-Type": "text/html" },
  });
});

router.get("/public/app.css", async (req) => {
  return new Response(await Bun.file("./public/app.css"), {
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
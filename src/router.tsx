import * as React from "react";
import { renderToString } from "react-dom/server";

import { renderComponent } from "./framework";
import Router from "./framework/router";
import { Customers } from "./pages/Customers";
import Login from "./pages/Login";
import { Navbar } from "./pages/Navbar";
import { Orders } from "./pages/Orders";

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
  return renderComponent(req, <Login />);
});

router.get("/orders", (req) => {
  return renderComponent(req, <Orders message="Hello from server!" />);
});

router.get("/customers", (req) => {
  return renderComponent(req, <Customers />);
});

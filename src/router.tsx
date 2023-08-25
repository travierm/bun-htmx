import * as React from "react";
import { renderToString } from "react-dom/server";

import { renderComponent } from "./framework";
import Router from "./framework/router";
import { About } from "./pages/About";
import { Navbar } from "./pages/Navbar";
import { UserList } from "./pages/UserList";

export const router = new Router();

router.get("/", async (req) => {
  const publicHtml = await Bun.file("./public.html").text();
  const component = await renderToString(<Navbar />);

  return new Response(publicHtml.replace("@content", component), {
    headers: { "Content-Type": "text/html" },
  });
});

router.get("/dist/output.css", async (req) => {
  return new Response(await Bun.file("./dist/output.css"), {
    headers: { "Content-Type": "text/css" },
  });
});

router.get("/about", (req) => {
  return renderComponent(req, <About message="Hello from server!" />);
});

router.get("/users", (req) => {
  return renderComponent(req, <UserList />);
});

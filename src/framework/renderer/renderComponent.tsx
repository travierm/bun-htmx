import { Context } from "hono";
import React from "react";
import { renderToString } from "react-dom/server";

import { htmlParser } from "./parseHtml";

await htmlParser.parse("./public/index.html");

// needs to stay in this file to work
export const RequestContext = React.createContext<Context | undefined>(
  undefined
);

function RequestProvider({
  data,
  children,
}: {
  data: Context;
  children: React.ReactNode;
}) {
  console.log("RequestProvider", data.req.path);
  return (
    <RequestContext.Provider value={data}>{children}</RequestContext.Provider>
  );
}

export function applyContext(c: Context, component: React.ReactElement) {
  console.log("applyContext", c.req.path);
  return <RequestProvider data={c}>{component}</RequestProvider>;
}

export async function renderComponent(
  c: Context,
  component: React.ReactElement
) {
  console.log("render", c.req.path);
  const stringComponent = renderToString(applyContext(c, component));

  return new Response(stringComponent, {
    headers: { "Content-Type": "text/html" },
  });
}

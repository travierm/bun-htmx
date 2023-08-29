import { HonoRequest } from "hono";
import { html } from "hono/html";
import { renderToString } from "react-dom/server";

import { htmlParser } from "./parseHtml";

await htmlParser.parse("./public/index.html");

export async function renderComponent(
  request: HonoRequest,
  component: React.ReactElement
) {
  const stringComponent = renderToString(component);

  if (!request.headers.get("Hx-Boosted")) {
    const html = htmlParser.injectContent(stringComponent);

    return new Response(html, {
      headers: { "Content-Type": "text/html" },
    });
  }

  return new Response(stringComponent, {
    headers: { "Content-Type": "text/html" },
  });
}

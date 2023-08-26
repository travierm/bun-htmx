import { renderToString } from "react-dom/server";
import { timer } from "../utils/timer";
import { htmlParser } from "./parseHtml";

await htmlParser.parse("/public/index.html");

export async function renderComponent(
  request: Request,
  component: React.ReactElement
) {
  timer.start("renderToString");
  const stringComponent = renderToString(component);
  timer.stop("renderToString");

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

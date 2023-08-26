import * as React from "react";
import { renderToReadableStream, renderToString } from "react-dom/server";

export async function renderComponent(
  request: Request,
  component: React.ReactElement
) {
  if (!request.headers.get("Hx-Boosted")) {
    const publicHtml = await Bun.file("./public/index.html").text();
    const resp = renderToString(component);

    return new Response(publicHtml.replace("@content", resp), {
      headers: { "Content-Type": "text/html" },
    });
  }

  const mergedElement = React.cloneElement(component, {
    request,
  });

  const stream = await renderToReadableStream(mergedElement);

  return new Response(stream, {
    headers: { "Content-Type": "text/html" },
  });
}

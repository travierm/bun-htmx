import { Serve } from "bun";
import { renderToString } from "react-dom/server";

import { Navbar } from "./src/pages/Navbar";
import { router } from "./src/router";

const ENV_PORT = 4000;
const ENV_HOSTNAME = "localhost";
const ENV_DEV = true;

// Render a template
console.log(`BunHTMX server running at: http://${ENV_HOSTNAME}:${ENV_PORT}`);

export default {
  port: ENV_PORT,
  hostname: ENV_HOSTNAME,
  development: ENV_DEV,
  async fetch(req) {
    const url = new URL(req.url);

    if (url.pathname === "/") {
      const publicHtml = await Bun.file("./public.html").text();
      const component = await renderToString(<Navbar />);

      return new Response(publicHtml.replace("@content", component), {
        headers: { "Content-Type": "text/html" },
      });
    }

    return await router.run(url.pathname, req);
  },
} satisfies Serve;

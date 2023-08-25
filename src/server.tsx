import { Serve } from 'bun';
import * as React from 'react';
import { renderToString } from 'react-dom/server';

import { Navbar } from './pages/Navbar';
import { router } from './router';

const ENV_PORT = 4000;
const ENV_HOSTNAME = "localhost";
const ENV_DEV = true;

// Render a template
console.log(`BunHTMX server running at: http://${ENV_HOSTNAME}:${ENV_PORT}`);

// reportWebVitals();

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

    if (url.pathname === "/dist/output.css") {
      return new Response(await Bun.file("./dist/output.css"), {
        headers: { "Content-Type": "text/css" },
      });
    }

    return await router.run(url.pathname, req);
  },
} satisfies Serve;

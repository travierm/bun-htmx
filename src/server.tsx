import { Serve } from "bun";
import * as React from "react";

import { router } from "./router";

const ENV_PORT = 4000;
const ENV_HOSTNAME = "localhost";
const ENV_DEV = true;

export default {
  port: ENV_PORT,
  hostname: ENV_HOSTNAME,
  development: ENV_DEV,
  async fetch(req: Request) {
    return router.serve(req);
  },
} satisfies Serve;

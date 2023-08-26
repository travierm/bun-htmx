import { expect, test } from "bun:test";

import Server from "../src/framework/server/server";
import { router } from "../src/router";

const server = new Server();

server.useRouter({
  router: router,
});

test("can GET /ping", async () => {
  server.listen({
    port: 4444,
    hostname: "localhost",
  });

  const response = await fetch("http://localhost:4444/ping", {
    method: "GET",
  });

  expect(response.status).toBe(200);
  expect(await response.text()).toBe("pong");

  server.stop();
});

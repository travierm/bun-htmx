import Server from "./framework/server";
import { router } from "./router";

const ENV_PORT = 4000;
const ENV_HOSTNAME = "localhost";
const ENV_DEV = true;

const server = new Server();

console.log(`bun-htmx running at http://localhost:${ENV_PORT}`);

server.useRouter({
  router: router,
});

server.listen({
  port: ENV_PORT,
  hostname: ENV_HOSTNAME,
  development: ENV_DEV,
});

server.printRoutes();

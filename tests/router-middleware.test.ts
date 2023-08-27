import { expect, test } from "bun:test";

import Router from "../src/framework/server/router";
import { Middleware } from "../src/framework/server/routerMiddlewareMixin";

test("can run global middleware", async () => {
  // Arrange
  const router = new Router();
  let counter: number = 0;

  router.use(async (req, res, next) => {
    counter = counter + 1;

    next();
  });

  router.get("/", async (req) => {
    return new Response("middleware");
  });

  // Act
  router.serve(new Request("http://localhost/"));
  router.serve(new Request("http://localhost/"));

  // Assert
  expect(counter).toBe(2);
});

test("can run route specfic middleware", async () => {
  // Arrange
  const router = new Router();
  let counter: number = 0;
  const routeSpecficMiddleware: Middleware = async (req, res, next) => {
    counter = counter + 1;

    next();
  };

  router.group([routeSpecficMiddleware], () => {
    router.get("/ping", async (req) => {
      return new Response("middleware");
    });
  });

  // Act & Assert
  await router.serve(new Request("http://localhost/about"));
  expect(counter).toBe(0);
  await router.serve(new Request("http://localhost/ping"));
  expect(counter).toBe(1);
});

test("middleware can end request", async () => {
  // Arrange
  const router = new Router();

  const endRequestMiddleware: Middleware = async (req, res, next) => {
    res.send(500, "middleware error");
  };

  router.use(endRequestMiddleware);
  router.get("/ping", async (req) => {
    return new Response("middleware");
  });

  // Act & Assert
  const response = await router.serve(new Request("http://localhost/ping"));
  expect(response.text()).resolves.toBe("middleware error");
});

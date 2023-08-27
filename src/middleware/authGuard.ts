export async function authGuard(req: Request) {
  console.log("auth guard was called");

  return req;
}

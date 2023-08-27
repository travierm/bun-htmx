export function authGuard(req: Request): Response | null {
  const { pathname } = new URL(req.url);

  if (pathname.startsWith("/admin")) {
    // Check if user is logged in
    // If not, redirect to login page
    return new Response("Admin page");
  }

  return null;
}

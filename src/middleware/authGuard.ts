export type User = {
  id: number;
  username: string;
};

declare global {
  interface Request {
    user: User | null;
  }
}

export async function authGuard(req: Request) {
  req.user = {
    id: 1,
    username: "test",
  };
}

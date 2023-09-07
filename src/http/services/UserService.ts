const { v4: uuidv4 } = require("uuid");
type User = {
  id: number;
  email: string;
  password: string;
  token: string;
  tokenExpiration?: Date;
};

const users: User[] = [];
const tokenStore = new Map<string, User>();

export class UserService {
  public createUser(email: string, password: string): User {
    const user = { email, password, token: uuidv4(), id: users.length + 1 };
    users.push(user);

    return user;
  }

  private getUser(email: string): User | undefined {
    return users.find((user) => user.email === email);
  }

  public async loginUser(
    email: string,
    password: string
  ): Promise<User | undefined> {
    const user = this.getUser(email);
    if (!user) {
      return undefined;
    }

    const hashedPassword = await Bun.password.hash(password);
    if (!Bun.password.verify(user.password, hashedPassword)) {
      throw new Error("Invalid password");
    }

    user.token = uuidv4();
    user.tokenExpiration = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7);

    tokenStore.set(user.token, user);

    return user;
  }
}

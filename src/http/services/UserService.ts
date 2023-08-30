const { v4: uuidv4 } = require("uuid");
type User = {
  email: string;
  password: string;
  token?: string;
  tokenExpiration?: number;
};

const users: User[] = [];

export class UserService {
  public createUser(email: string, password: string): User {
    const user = { email, password };
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
    user.tokenExpiration = Date.now() + 1000 * 60 * 60 * 24 * 7; // 7 days

    return user;
  }
}

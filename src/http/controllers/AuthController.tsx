import { Context } from "hono";
import { setCookie } from "hono/cookie";

import { renderComponent } from "../../framework/renderer/renderComponent";
import { Login } from "../../views/pages/Login";
import { UserService } from "../services/UserService";

export class AuthController {
  userService: UserService = new UserService();

  constructor() {
    this.userService.createUser("admin", "admin");
  }

  public getLogin(c: Context) {
    return renderComponent(<Login />);
  }

  async postLogin(c: Context) {
    const body = await c.req.formData();
    try {
      const user = await this.userService.loginUser(
        body.get("email"),
        body.get("password")
      );

      if (!user) {
        return renderComponent(<Login errors={{ login: "failed" }} />);
      }

      setCookie(c, "token", user.token, {
        expires: user.tokenExpiration,
      });
    } catch (e) {
      throw e;
      return renderComponent(<Login errors={{ login: "failed" }} />);
    }

    return c.redirect("/customers");
  }
}

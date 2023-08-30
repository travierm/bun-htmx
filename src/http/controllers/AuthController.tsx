import { Context } from "hono";

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
      const user = this.userService.loginUser(
        body.get("email"),
        body.get("password")
      );

      console.log(body.get("email"));
      console.log(user);

      if (!user) {
        return renderComponent(<Login errors={{ login: "failed" }} />);
      }
    } catch (e) {
      throw e;
      return renderComponent(<Login errors={{ login: "failed" }} />);
    }

    return c.redirect("/customers");
  }
}

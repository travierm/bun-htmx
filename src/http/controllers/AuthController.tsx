import { Context } from "hono";
import { setCookie } from "hono/cookie";
import { z } from "zod";

import { renderComponent } from "../../framework/renderer/renderComponent";
import { serviceContainer } from "../../services";
import { Login } from "../../views/pages/Login";
import { UserService } from "../services/UserService";

export class AuthController {
  userService: UserService = serviceContainer.resolve(UserService);

  public getLogin(c: Context) {
    return renderComponent(<Login />);
  }

  async postLogin(c: Context) {
    const verifier = z.object({
      email: z.string(),
      password: z.string(),
    });

    const body = verifier.parse(c.req.parseBody());

    try {
      const user = await this.userService.loginUser(body.email, body.password);

      if (!user) {
        return renderComponent(<Login errors={{ login: "failed" }} />);
      }

      setCookie(c, "token", user.token, {
        expires: user.tokenExpiration,
      });
    } catch (e) {
      return renderComponent(<Login errors={{ login: "failed" }} />);
    }

    return c.redirect("/customers");
  }
}

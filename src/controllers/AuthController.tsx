import { Context } from "hono";

import { renderComponent } from "../framework/renderer/renderComponent";
import { Login } from "../views/pages/Login";

export class AuthController {
  public getLogin(c: Context) {
    return renderComponent(<Login />);
  }
}

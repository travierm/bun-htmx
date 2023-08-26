import { renderComponent } from "../framework/renderer/renderComponent";
import { Login } from "../views/pages/Login";

export class AuthController {
  public getLogin(req: Request) {
    return renderComponent(req, <Login />);
  }
}

import { Context } from "hono";

import { renderComponent } from "../framework/renderer/renderComponent";
import { Login } from "../views/pages/Login";

export class AuthController {
  public getLogin(c: Context) {
    return renderComponent(<Login />);
  }

  public async postLogin(c: Context) {
    // const schema = z.object({
    //   username: z.string().min(3),
    //   password: z.string().min(3),
    // });

    // const formData = await c.req.formData();

    // const result = schema.safeParse(formData);
    // if (!result.success) {
    //   console.log(result.error);
    //   return renderComponent(<Login />);
    // }

    const didLogin = false;

    if (!didLogin) {
      return renderComponent(<Login errors={{ login: "failed" }} />);
    }

    return renderComponent(<Login />);
  }
}

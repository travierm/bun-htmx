import { Context } from "hono";

import { renderComponent } from "../../framework/renderer/renderComponent";
import { CreateTransaction } from "../../views/pages/CreateTransaction";

export class TransactionController {
  public getCreate(c: Context) {
    return renderComponent(c, <CreateTransaction />);
  }
}

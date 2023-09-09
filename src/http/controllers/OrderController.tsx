import { Context } from "hono";

import { renderComponent } from "../../framework/renderer/renderComponent";
import { Orders } from "../../views/pages/Orders";

export class OrderController {
  public getOrders(c: Context) {
    return renderComponent(c, <Orders message="hello from hono" context={c} />);
  }
}

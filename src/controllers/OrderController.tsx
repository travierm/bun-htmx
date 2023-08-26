import { renderComponent } from "../framework/renderer/renderComponent";
import { Orders } from "../views/pages/Orders";

export class OrderController {
  public getOrders(req: Request) {
    return renderComponent(req, <Orders message="my order message" />);
  }
}

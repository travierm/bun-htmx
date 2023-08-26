import { renderComponent } from "../framework/renderer/renderComponent";
import { Customers } from "../views/pages/Customers";

export class CustomerController {
  public getCustomers(req: Request) {
    return renderComponent(req, <Customers />);
  }
}

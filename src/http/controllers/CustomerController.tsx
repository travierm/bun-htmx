import { Context } from "hono";

import { renderComponent } from "../../framework/renderer/renderComponent";
import { Customers } from "../../views/pages/Customers";

export class CustomerController {
  public getCustomers(c: Context) {
    return renderComponent(<Customers />);
  }
}

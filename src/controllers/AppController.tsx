import { renderComponent } from "../framework/renderer/renderComponent";
import { Navbar } from "../views/pages/Navbar";

const cssFile = await Bun.file("./public/app.css").text();

export class AppController {
  public async getIndex(req: Request) {
    return renderComponent(req, <Navbar />);
  }

  public async getAppCss(req: Request) {
    return new Response(cssFile, {
      headers: { "Content-Type": "text/css" },
    });
  }
}

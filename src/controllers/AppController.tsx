import { renderComponent } from "../framework/renderer/renderComponent";
import { Navbar } from "../views/pages/Navbar";

let cachedCssFile: string | undefined;

export class AppController {
  public async getIndex(req: Request) {
    return renderComponent(req, <Navbar />);
  }

  public async getAppCss(req: Request) {
    if (!cachedCssFile) {
      cachedCssFile = await Bun.file("./public/app.css").text()
    }

    return new Response(cachedCssFile, {
      headers: { "Content-Type": "text/css" },
    });
  }
}

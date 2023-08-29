import { Context } from "hono";

import { Navbar } from "../views/pages/Navbar";

let cachedCssFile: string | undefined;

export class AppController {
  public async getIndex(c: Context) {
    console.log("here");
    return c.html(<Navbar />);
  }

  public async getAppCss(req: Request) {
    if (!cachedCssFile) {
      cachedCssFile = await Bun.file("./public/app.css").text();
    }

    return new Response(cachedCssFile, {
      headers: { "Content-Type": "text/css" },
    });
  }
}

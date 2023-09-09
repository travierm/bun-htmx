import React from "react";

import { RequestContext } from "../../framework/renderer/renderComponent";
import { Navbar } from "../pages/Navbar";

type Props = {
  children?: React.ReactNode;
};

export function Layout(props: Props) {
  const context = React.useContext(RequestContext);
  const authUser = context?.get("user");

  return (
    <div className="h-full">
      <Navbar isAuthed={authUser} />

      {props.children}
    </div>
  );
}

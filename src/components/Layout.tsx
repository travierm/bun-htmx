import React from "react";

import { Navbar } from "../pages/Navbar";

type Props = {
  children?: React.ReactNode;
};

export function Layout(props: Props) {
  return (
    <div>
      <Navbar />

      {props.children}
    </div>
  );
}

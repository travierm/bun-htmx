import * as React from "react";

import { ComponentProps } from "../../framework/globalProps";
import { Layout } from "../components/Layout";

type Props = ComponentProps & {
  message: string;
};

export function Orders(props: Props) {
  return (
    <Layout>
      <h1>Orders</h1>
      <h1>{props.message}</h1>
    </Layout>
  );
}

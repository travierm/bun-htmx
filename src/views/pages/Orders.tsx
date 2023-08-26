import * as React from "react";

import { Layout } from "../components/Layout";

export function Orders(props: { message: string; request?: Request }) {
  return (
    <Layout>
      <h1>Orders</h1>
      <h1>{props.message}</h1>
    </Layout>
  );
}

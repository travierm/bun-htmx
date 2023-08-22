import React from "react";

import { Layout } from "../components/Layout";

export function About(props: { message: string }) {
  return (
    <Layout>
      <h1>{props.message}</h1>
    </Layout>
  );
}

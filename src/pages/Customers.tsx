import * as React from "react";

import { Layout } from "../components/Layout";

type User = {
  name: string;
};

const users: User[] = [];

for (var i = 0; i <= 10000; i++) {
  users.push({
    name: (Math.random() + 1).toString(36).substring(7),
  });
}

export function Customers(props: {}) {
  return (
    <Layout>
      <h1>Customers</h1>
      <ul>
        {users.map((user) => {
          return <li key={user.name}>{user.name}</li>;
        })}
      </ul>
    </Layout>
  );
}

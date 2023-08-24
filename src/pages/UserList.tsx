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

export function UserList(props: {}) {
  return (
    <Layout>
      <ul>
        {users.map((user) => {
          return <li>{user.name}</li>;
        })}
      </ul>
    </Layout>
  );
}

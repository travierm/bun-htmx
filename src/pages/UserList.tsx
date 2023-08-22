import { Layout } from "../components/Layout";

type User = {
  name: string;
};

export function UserList(props: {}) {
  const users: User[] = [
    {
      name: "John",
    },
    {
      name: "Jim",
    },
    {
      name: "Scott",
    },
  ];

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

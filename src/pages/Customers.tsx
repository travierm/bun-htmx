import { Layout } from "../components/Layout";

type User = {
  name: string;
};

const users: User[] = [];

for (var i = 0; i <= 100000; i++) {
  users.push({
    name: (Math.random() + 1).toString(36).substring(7),
  });
}

export function UserList(props: {}) {
  return (
    <Layout>
      <ul style={{overflow: 'scroll', height: '93vh'}}>
        {users.map((user) => {
          return <li key={user.name}>{user.name}</li>;
        })}
      </ul>
    </Layout>
  );
}

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
    <ul>
      {users.map((user) => {
        return <li>{user.name}</li>;
      })}
    </ul>
  );
}

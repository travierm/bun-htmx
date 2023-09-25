import { FormInput } from "../components/form/Input";
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

export function CreateTransaction(props: {}) {
  return (
    <Layout>
      <div className="flex items-center justify-center">
        <h1>Create Transaction</h1>
        <form>
          <FormInput
            name="description"
            type="text"
            label="Desc"
            placeholder="Desc"
            required
          />

          <FormInput
            name="desciption"
            type="text"
            label="Email"
            placeholder="Email"
            required
          />
        </form>
      </div>
    </Layout>
  );
}

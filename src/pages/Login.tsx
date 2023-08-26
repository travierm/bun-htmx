import { BaseButton } from "../components/BaseButton";
import { FormInput } from "../components/form/Input";
import { Layout } from "../components/Layout";

export default function Customers() {
  return (
    <Layout>
      <div className="flex items-center justify-center">
        <form>
          <h1 className="text-2xl font-bold mb-4">Login</h1>

          <FormInput
            type="email"
            label="Username"
            placeholder="Username"
            required
          />

          <FormInput
            type="password"
            label="Password"
            placeholder="Password"
            required
          />

          <div className="flex justify-end">
            <BaseButton>Login</BaseButton>
          </div>
        </form>
      </div>
    </Layout>
  );
}

import { ErrorBag } from "../../framework/globalProps";
import { BaseButton } from "../components/BaseButton";
import { FormInput } from "../components/form/Input";
import { Layout } from "../components/Layout";

type Props = {
  errors?: ErrorBag;
};
export function Login(props: Props) {
  return (
    <Layout>
      <div className="flex items-center justify-center">
        <form method="POST">
          <h1 className="text-2xl font-bold mb-4">Login</h1>

          {props.errors && (
            <div>
              <h1>Bad Login</h1>
            </div>
          )}

          <FormInput
            name="email"
            type="text"
            label="Email"
            placeholder="Email"
            required
          />

          <FormInput
            name="password"
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

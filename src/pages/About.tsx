import { Layout } from '../components/Layout';

export function About(props: { message: string; request?: Request }) {
  return (
    <Layout>
      <h1>{props.message}</h1>
    </Layout>
  );
}

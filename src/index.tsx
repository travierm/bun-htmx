import { generateHydrationScript } from "solid-js/web";

type Props = {
  children: JSX.Element;
};

export function Index(props: Props) {
  return (
    <html lang="en">
      <head>
        <title>🔥 Solid SSR 🔥</title>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="/styles.css" />${generateHydrationScript()}
      </head>
      <body>{props.children}</body>
    </html>
  );
}

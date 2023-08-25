import * as React from 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      _: React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }
  }

  let elements: string;
}

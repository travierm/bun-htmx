import { PropsWithChildren, ReactElement, JSXElementConstructor } from "react";

export function jsxToString(jsxElement: React.PropsWithChildren<React.ReactElement>) {
  if (typeof jsxElement === 'string' || typeof jsxElement === 'number') {
    return String(jsxElement);
  }

  const { type, props } = jsxElement;
  const children = props.children || [];

  const childrenStrings = children.map((child: PropsWithChildren<ReactElement<any, string | JSXElementConstructor<any>>>) => jsxToString(child)).join('');

  const propStrings = Object.keys(props)
    .filter(propName => propName !== 'children')
    .map(propName => `${propName}="${props[propName]}"`)
    .join(' ');

  return `<${type} ${propStrings}>${childrenStrings}</${type}>`;
}

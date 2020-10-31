declare module '*.svg' {
  import React = require('react');
  export const ReactComponent: React.SFC<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}

declare module '*.png' {
  const src: string;
  export default src;
}

interface Array<T> {
    flat(): Array<T>;
    flatMap(func: (x: T) => T): Array<T>;
}

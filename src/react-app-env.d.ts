/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

declare module '*.vert' {
  const src: string;
  export default src;
}

declare module '*.frag' {
  const src: string;
  export default src;
}

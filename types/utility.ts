// deno-lint-ignore-file no-explicit-any

export type ExtendsAbstract<T extends abstract new (...args: any[]) => any> =
  T extends abstract new (...args: infer Args) => infer Instance
    ? new (...args: Args) => Instance
    : never;

export type Constructor<T = unknown> = new (...args: any[]) => T;

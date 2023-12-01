export type RunFn = () => string;

export type Part = {
  name: string;
  run: RunFn;
};

export type Day = {
  name: string;
  parts: Part[];
};

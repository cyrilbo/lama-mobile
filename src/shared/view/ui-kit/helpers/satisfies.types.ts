export type Satisfies<
  U,
  T extends U & { [K in keyof T]: K extends keyof U ? T[K] : never },
> = T;

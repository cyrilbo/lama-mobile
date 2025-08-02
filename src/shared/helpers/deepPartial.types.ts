type ExtractObjects<T> = T extends infer U
  ? U extends object
    ? U
    : never
  : never;

export type DeepPartial<T> = {
  [K in keyof T]?: ExtractObjects<T[K]> extends never
    ? T[K]
    : DeepPartial<T[K]>;
};

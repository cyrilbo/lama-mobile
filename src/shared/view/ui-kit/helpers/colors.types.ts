// Step 1: Extract colors that are strings starting with '#'
type ExtractColors<T> = {
  [K in keyof T]: T[K] extends string
    ? T[K] extends `#${string}`
      ? T[K]
      : never
    : T[K] extends object
      ? ExtractColors<T[K]>
      : never;
};

// Step 2: Recursively filter out properties where the value is `never`
// and remove keys whose objects have no valid properties after filtering
type FilterNever<T> = {
  [K in keyof T as T[K] extends never ? never : K]: T[K] extends object
    ? FilterNever<T[K]>
    : T[K];
};

export type KeepOnlyColors<T> = FilterNever<ExtractColors<T>>;

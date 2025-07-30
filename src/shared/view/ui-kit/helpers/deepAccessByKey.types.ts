/**
 * Recursively accesses a nested property of an object type `T` using a dot-separated string key `K`.
 *
 * This type allows deep property access through a string key, which can represent a path to a nested property
 * in the object. If the path is valid, it returns the type of the nested property. Otherwise, it resolves to `never`.
 *
 * ### Example
 * ```typescript
 * type Obj = { a: { b: { c: 123 } } };
 * type Result = DeepAccess<Obj, "a.b.c">; // Result will be 123
 * ```
 *
 * @returns The type of the nested property at the specified path, or `never` if the path is invalid.
 */
export type DeepAccessByKey<
  T,
  K extends string,
> = K extends `${infer Head}.${infer Tail}`
  ? Head extends keyof T
    ? DeepAccessByKey<T[Head], Tail>
    : never
  : K extends keyof T
    ? T[K]
    : never;

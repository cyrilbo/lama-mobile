/**
 * Extract the keys of an object, including nested keys.
 *
 * ```
 * type Keys = ExtractKeys<{ a: { b: 123 }, c: 456 }> // Keys equals to "a" | "a.b" | "c";
 * ```
 */
export type ExtractKeys<T, K extends keyof T = keyof T> = K extends string
  ? T[K] extends object
    ? `${K}` | `${K}.${ExtractKeys<T[K]>}`
    : `${K}`
  : never;

export type ExtractStringKeys<T> = Extract<keyof T, string>;

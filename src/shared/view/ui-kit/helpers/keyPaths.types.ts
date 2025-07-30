type Primitive = string | number | boolean | bigint | symbol | undefined | null;

/**
 * Determines if a given type has a `fontSize` property.
 *
 * @template T - The type to check for a `fontSize` property.
 *
 * This utility type checks if the given type has a `fontSize` property and
 * returns `true` if it does, otherwise `false`.
 *
 * @example
 * ```typescript
 * type HasFont = HasFontSize<{ fontSize: number }>; // true
 * type NoFont = HasFontSize<{ color: string }>; // false
 * ```x
 */
type HasFontSize<T> = T extends { fontSize: number } ? true : false;

// Exclude symbols from the keys since they cannot be used in template literals
type StringNumberKeys<T> = Exclude<keyof T, symbol>;

/**
 * Extracts the object keys as string paths, stopping at the first object that contains a `fontSize` property.
 *
 * @template T - The object type to extract keys from.
 * @template Prefix - An optional string prefix to prepend to each key path. Defaults to an empty string.
 *
 * This type recursively extracts object keys as string paths, but stops at
 * the first object containing a `fontSize` property.
 *
 * @example
 * ```typescript
 * type KeyPaths = ObjectKeyPaths<typeof theme>;
 * // Example result: "input.state.hover"
 * ```
 */
export type ObjectKeyPaths<T, Prefix extends string = ""> = {
  [K in StringNumberKeys<T>]-?: HasFontSize<T[K]> extends true
    ? `${Prefix}${K}`
    : T[K] extends object
      ? T[K] extends Primitive
        ? never
        : ObjectKeyPaths<T[K], `${Prefix}${K}.`>
      : never;
}[StringNumberKeys<T>];

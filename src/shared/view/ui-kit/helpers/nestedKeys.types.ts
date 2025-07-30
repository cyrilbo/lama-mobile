/**
 * Extracts the nested keys of an object as a string path.
 *
 * @template T - The type of the object to extract keys from.
 * @template Prefix - An optional string prefix to prepend to each key path. Defaults to an empty string.
 *
 * This type recursively traverses the object and returns the nested keys
 * as string paths. If the path is empty, it returns `never`.
 *
 * @example
 * ```typescript
 * type ThemeKeys = NestedKeys<typeof theme>;
 * // Example result: ".input.state.hover.border-color"
 * ```
 */

export type NestedKeys<T, Prefix extends string = ""> = T extends object
  ? {
      [K in keyof T]: NestedKeys<
        T[K], // Recur on the value at `T[K]`
        `${Prefix}${K extends string ? `.${K}` : ""}` // Append current key to the path if `K` is a string
      >;
    }[keyof T] // Combine all paths into a union
  : Prefix extends "" // If not an object and no prefix is given, return `never`
    ? never
    : // eslint-disable-next-line @typescript-eslint/no-unused-vars
      Prefix extends `${infer _Head}.${infer Tail}` // Extract the tail of the path (part after the first dot)
      ? Tail // Return the tail (i.e., the path without the root)
      : never; // Fallback case

/**
 * Extracts the second-to-last nested key that has a string value.
 *
 * @template T - The type of the object to extract keys from.
 * @template Prefix - An optional string prefix to prepend to each key path.
 *
 * This type traverses the object and stops at the second-to-last key, returning
 * the current path when it encounters a string value.
 *
 * @example
 * ```typescript
 * type SecondToLastKey = NestedKeysWithSecondToLastStringValues<typeof theme>;
 * // Example result: ".input.state.hover"
 * ```
 */
export type NestedKeysWithSecondToLastStringValues<
  T,
  Prefix extends string = "",
> = T extends object
  ? {
      [K in keyof T]: T[K] extends string
        ? Prefix // If value is a string, return the current prefix (which stops recursion)
        : T[K] extends object
          ? NestedKeysWithSecondToLastStringValues<
              T[K],
              `${Prefix}${Prefix extends "" ? "" : "."}${K & string}`
            >
          : never;
    }[keyof T] // Combine all valid second-to-last string paths into a union
  : never; // If not an object, return `never`

/**
 * A TypeScript utility type that recursively extracts the keys of an object
 * that lead to other nested objects, and formats those keys in dot notation.
 *
 * Example:
 * ```
 * type Example = {
 *   a: {
 *     b: number;
 *     d: {
 *       e: number;
 *     };
 *   };
 *   c: number;
 * };
 *
 * type Result = NestedObjectKeys<Example>;
 * // Result will be: "a" | "a.d"
 * ```
 */
export type NestedObjectKeys<T> = T extends object
  ? {
      [K in keyof T]: T[K] extends object
        ?
            | Extract<K, string | number>
            | `${Extract<K, string | number>}.${NestedObjectKeys<T[K]>}`
        : never;
    }[keyof T]
  : never;

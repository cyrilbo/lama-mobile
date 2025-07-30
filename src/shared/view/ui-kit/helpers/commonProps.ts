/**
 * Recursively merges two nested objects by retaining only the properties that exist in both objects.
 * For each common property, if the values are objects, it recursively applies `NestedJoin` to their nested properties.
 * For non-object values, it creates a union of the literal values from both objects.
 *
 * @template T - The first object to merge.
 * @template U - The second object to merge.
 *
 * @example
 * ```typescript
 * const a = {
 *   primary: {
 *     main: '#ff0000',
 *     light: 123,
 *   },
 * } as const;
 *
 * const b = {
 *   primary: {
 *     main: '#00ff00',
 *     lighter: 456,
 *   },
 * } as const;
 *
 * type Result = NestedJoin<typeof a, typeof b>;
 * // Resulting type:
 * // {
 * //   primary: {
 * //     main: '#ff0000' | '#00ff00';
 * //   }
 * // }
 * ```
 *
 * @remarks
 * - Properties that are not present in both objects are excluded.
 * - For common properties that are objects, the merge happens recursively.
 * - For common properties that are not objects, their literal values are unioned.
 */

export type NestedJoin<T, U> = {
  [K in keyof T & keyof U]: T[K] extends object
    ? U[K] extends object
      ? NestedJoin<T[K], U[K]> // Recursively apply to nested objects
      : never
    : T[K] | U[K]; // Union of literal values for common properties
};

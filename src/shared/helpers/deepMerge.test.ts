import { deepMerge } from "./deepMerge";

describe("deepMerge", () => {
  describe("basic object merging", () => {
    it("merges simple objects", () => {
      const target = { a: 1, b: 2 };
      const source = { b: 3, c: 4 };
      const result = deepMerge(target, source);

      expect(result).toEqual({ a: 1, b: 3, c: 4 });
    });

    it("handles nested objects", () => {
      const target = { a: { x: 1, y: 2 }, b: 3 };
      const source = { a: { y: 4, z: 5 }, c: 6 };
      const result = deepMerge(target, source);

      expect(result).toEqual({ a: { x: 1, y: 4, z: 5 }, b: 3, c: 6 });
    });

    it("does not mutate the original target", () => {
      const target = { a: 1, b: { x: 2 } };
      const source = { b: { x: 3 } };
      const originalTarget = JSON.parse(JSON.stringify(target));

      deepMerge(target, source);

      expect(target).toEqual(originalTarget);
    });

    it("handles undefined source", () => {
      const target = { a: 1, b: 2 };
      const result = deepMerge(target, undefined);

      expect(result).toEqual(target);
    });

    it("handles empty source", () => {
      const target = { a: 1, b: 2 };
      const result = deepMerge(target, {});

      expect(result).toEqual(target);
    });
  });

  describe("array merging with override behavior (default)", () => {
    it("overrides arrays by default", () => {
      const target = { items: [1, 2, 3] };
      const source = { items: [4, 5] };
      const result = deepMerge(target, source);

      expect(result).toEqual({ items: [4, 5] });
    });

    it("overrides arrays with explicit override option", () => {
      const target = { items: [1, 2, 3] };
      const source = { items: [4, 5] };
      const result = deepMerge(target, source, {
        mergeArrayBehavior: "override",
      });

      expect(result).toEqual({ items: [4, 5] });
    });

    it("handles arrays in nested objects", () => {
      const target = { data: { items: [1, 2] }, other: "value" };
      const source = { data: { items: [3, 4] } };
      const result = deepMerge(target, source);

      expect(result).toEqual({ data: { items: [3, 4] }, other: "value" });
    });
  });

  describe("array merging with merge behavior", () => {
    it("merges arrays without duplicates", () => {
      const target = { items: [1, 2, 3] };
      const source = { items: [3, 4, 5] };
      const result = deepMerge(target, source, { mergeArrayBehavior: "merge" });

      expect(result).toEqual({ items: [1, 2, 3, 4, 5] });
    });

    it("handles arrays in nested objects with merge behavior", () => {
      const target = { data: { items: ["a", "b"] }, other: "value" };
      const source = { data: { items: ["b", "c"] } };
      const result = deepMerge(target, source, { mergeArrayBehavior: "merge" });

      expect(result).toEqual({
        data: { items: ["a", "b", "c"] },
        other: "value",
      });
    });
  });

  describe("custom merge behavior function", () => {
    it("uses custom merge function when provided", () => {
      const target = { items: [1, 2], value: 10 };
      const source = { items: [3, 4], value: 20 };

      const customMerge = (
        objValue: unknown,
        srcValue: unknown,
        key: string,
      ) => {
        if (
          key === "value" &&
          typeof objValue === "number" &&
          typeof srcValue === "number"
        ) {
          return objValue + srcValue;
        }
        return undefined; // Use default behavior for other keys
      };

      const result = deepMerge(target, source, {
        mergeArrayBehavior: "override",
        mergeBehaviorFunction: customMerge,
      });

      expect(result).toEqual({ items: [3, 4], value: 30 });
    });
  });
});

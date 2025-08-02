import mergeWith from "lodash.mergewith";
import { DeepPartial } from "./deepPartial.types";

type ArrayOptions = {
  mergeArrayBehavior: "override" | "merge";
  mergeBehaviorFunction?: (
    objValue: unknown,
    srcValue: unknown,
    key: string,
  ) => unknown;
};

export const deepMerge = <T>(
  target: T,
  source?: DeepPartial<T>,
  options: ArrayOptions = { mergeArrayBehavior: "override" },
): T => {
  const baseObject = Array.isArray(target) && Array.isArray(source) ? [] : {};
  if (options?.mergeBehaviorFunction) {
    return mergeWith(
      baseObject,
      target,
      source ?? {},
      options.mergeBehaviorFunction,
    );
  }

  if (options?.mergeArrayBehavior === "merge") {
    return mergeWith(baseObject, target, source ?? {}, (objValue, srcValue) => {
      if (Array.isArray(objValue) && Array.isArray(srcValue)) {
        const newArray = [...objValue];
        for (const item of srcValue) {
          if (
            !objValue.find((i) => JSON.stringify(i) === JSON.stringify(item))
          ) {
            newArray.push(item);
          }
        }
        return newArray;
      }

      return undefined;
    });
  }

  return mergeWith(baseObject, target, source ?? {}, (objValue, srcValue) => {
    if (Array.isArray(objValue) && Array.isArray(srcValue)) {
      return srcValue;
    }

    return undefined;
  });
};

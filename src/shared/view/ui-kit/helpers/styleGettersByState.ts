import get from "lodash.get";

import type { DeepAccessByKey } from "./deepAccessByKey.types";
import type { ExtractKeys, ExtractStringKeys } from "./extractKeys.types";
import type { NestedKeys, NestedObjectKeys } from "./nestedKeys.types";
import type { Theme } from "../theme/theme.types";

/**
 * For now we only support colors and it is improperly typed
 *
 * @example
 * ```ts
 * getStyleValueByState(theme.button.level.primary, "disabled", "content-color")
 * ```
 * will return the theme value for the `"content-color"` key, under `button.level.primary.disabled` if it exists,
 * otherwise it will return the value of `"content-color"` under `button.level.primary`
 */
export const getStyleValueByState = <T>(
  obj: T,
  stateKey: NestedObjectKeys<T> | undefined,
  key: NestedKeys<T>,
): string | undefined => {
  // If no state is given, just return the root value
  if (!stateKey) {
    // @ts-expect-error typing this is super tricky, contributions welcome
    return get(obj, key);
  }

  // Split stateKey into parts and try each level
  const stateLevels = String(stateKey).split(".");

  for (let i = stateLevels.length; i >= 0; i--) {
    // Let's try each level
    // Do I have a.b.c.d.property?
    // Do I have a.b.c.property?
    // etc.
    const currentStatePath = stateLevels.slice(0, i).join(".");
    const result = get(
      obj,
      `${currentStatePath ? `${currentStatePath}.` : ""}${key}`,
    );

    if (result) {
      // @ts-expect-error typing this is super tricky, contributions welcome
      return result;
    }
  }

  // Fallback to root level
  // @ts-expect-error typing this is super tricky, contributions welcome
  return get(obj, key);
};

/**
 * This function returns the key path based on the presence of a state.
 *
 * @example
 * ```ts
 * getStyleKeyByState(theme, "components.radio-button", "disabled", "text-color")
 * ```
 * will return the key `"components.radio-button.disabled.text-color"` if the value under such key exists in the theme,
 * otherwise it will return the key `"components.radio-button.text-color"`
 */
export const getStyleKeyByState = <
  TThemeObject,
  TBasePath extends ExtractKeys<Theme>,
  TFinalKey extends ExtractStringKeys<DeepAccessByKey<TThemeObject, TBasePath>>,
>(
  obj: TThemeObject,
  basePath: TBasePath,
  stateKey:
    | NestedObjectKeys<DeepAccessByKey<TThemeObject, TBasePath>>
    | undefined,
  key: TFinalKey,
): `${TBasePath}.${TFinalKey}` => {
  // If no state is given, just return the root value
  if (!stateKey) {
    return `${basePath}.${key}`;
  }

  // Split stateKey into parts and try each level
  const stateLevels = String(stateKey).split(".");

  for (let i = stateLevels.length; i >= 0; i--) {
    // Let's try each level
    // Do I have a.b.c.d.property?
    // Do I have a.b.c.property?
    // etc.
    const currentStatePath = stateLevels.slice(0, i).join(".");
    const fullPathWithState = `${basePath}.${currentStatePath ? `${currentStatePath}.` : ""}${key}`;
    if (get(obj, fullPathWithState)) {
      // @ts-expect-error we admit that we don't handle all cases when it comes to types
      return fullPathWithState;
    }
  }

  // Fallback to root level
  return `${basePath}.${key}`;
};

import get from "lodash.get";

import type { KeepOnlyColors } from "./colors.types";
import type { NestedKeys } from "./nestedKeys.types";
import type { Theme } from "../theme/theme.types";
import { typographies } from "../theme/tokens/typographies";

import type { ObjectKeyPaths } from "./keyPaths.types";

// typography
export type TypographyKeyPaths = ObjectKeyPaths<typeof typographies>;
export const getTypographyWithKey = (key: TypographyKeyPaths) =>
  get(typographies, key) || key;

export type AnyThemeKeyPath = NestedKeys<Theme>;
export const getAnyThemeKeyPath = (theme: Theme, key: AnyThemeKeyPath) =>
  get(theme, key) || key;

// color
export type ColorKeyPaths = NestedKeys<KeepOnlyColors<Theme>>;
export const getColorKeyPath = (theme: Theme, key: ColorKeyPaths) =>
  get(theme, key);

// size
export type SizeKeyPaths = NestedKeys<Theme["sizes"]>;
export const getSizeKeyPath = (theme: Theme, key: SizeKeyPaths) =>
  get(theme.sizes, key);

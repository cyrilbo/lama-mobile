import { memo } from "react";
import { View } from "react-native";
import { useUnistyles } from "react-native-unistyles";

import { getSizeKeyPath, type SizeKeyPaths } from "../../helpers/getters";

// Get autocomplete for recommended values, but allow others too.
type SpacingValue = SizeKeyPaths | number;

type Props =
  | { horizontal: SpacingValue; flex?: number }
  | { vertical: SpacingValue; flex?: number }
  | { flex?: number };

export const Spacer = memo((props: Props) => {
  const { theme } = useUnistyles();

  if ("flex" in props) {
    return (
      <View
        pointerEvents="none"
        style={{
          flex: props.flex,
          ...("horizontal" in props && {
            minWidth:
              typeof props.horizontal === "string"
                ? getSizeKeyPath(theme, props.horizontal)
                : props.horizontal,
          }),
          ...("vertical" in props && {
            minHeight:
              typeof props.vertical === "string"
                ? getSizeKeyPath(theme, props.vertical)
                : props.vertical,
          }),
        }}
      />
    );
  }

  return (
    <View
      pointerEvents="none"
      style={{
        ...("horizontal" in props && {
          width:
            typeof props.horizontal === "string"
              ? getSizeKeyPath(theme, props.horizontal)
              : props.horizontal,
        }),
        ...("vertical" in props && {
          height:
            typeof props.vertical === "string"
              ? getSizeKeyPath(theme, props.vertical)
              : props.vertical,
        }),
      }}
    />
  );
});
Spacer.displayName = "Spacer";

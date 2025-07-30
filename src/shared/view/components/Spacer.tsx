import { memo } from "react";
import { View } from "react-native";

type Props =
  | { horizontal: number; flex?: number }
  | { vertical: number; flex?: number }
  | { flex?: number };

export const Spacer = memo((props: Props) => {
  if ("flex" in props) {
    return (
      <View
        pointerEvents="none"
        style={{
          flex: props.flex,
          ...("horizontal" in props && {
            minWidth: props.horizontal,
          }),
          ...("vertical" in props && {
            minHeight: props.vertical,
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
          width: props.horizontal,
        }),
        ...("vertical" in props && {
          height: props.vertical,
        }),
      }}
    />
  );
});

Spacer.displayName = "Spacer";

import type { PressableProps, ViewProps } from "react-native";
import { Pressable } from "react-native";
import { StyleSheet } from "react-native-unistyles";

type PressableWithFeedbackProps = Omit<PressableProps, "style"> &
  Pick<ViewProps, "style">;

export type PressableWithFeedbackState = "default" | "disabled";

export const PressableWithFeedback = ({
  children,
  style,
  disabled,
  ...props
}: PressableWithFeedbackProps) => {
  styles.useVariants({
    disabled: !!disabled,
  });

  return (
    <Pressable
      style={({ pressed }) => [styles.container({ pressed }), style]}
      disabled={disabled}
      accessibilityRole="button"
      accessible={false}
      {...props}
    >
      {children}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: (params: { pressed: boolean }) => ({
    variants: {
      disabled: {
        true: {
          opacity: 0.6,
        },
        false: {
          opacity: params.pressed ? 0.5 : 1,
        },
        default: {
          opacity: params.pressed ? 0.5 : 1,
        },
      },
    },
  }),
});

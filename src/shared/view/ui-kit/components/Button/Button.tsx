import { Pressable, View } from "react-native";

import { Loader } from "../Loader/Loader";
import { Typography } from "../Typography/Typography";
import {
  getStyleKeyByState,
  getStyleValueByState,
} from "../../helpers/styleGettersByState";
import { Icon } from "../../icons/Icon";
import type { Icons } from "../../icons/iconCatalog";
import type { Theme } from "../../theme/theme.types";
import { StyleSheet, useUnistyles } from "react-native-unistyles";

type ButtonVariants = "primary" | "secondary";
type Sizes = keyof Theme["components"]["button"]["size"];

const getButtonStyleState = ({
  pressed,
  disabled,
}: {
  pressed: boolean;
  disabled: boolean;
}) => {
  if (disabled) {
    return "disabled";
  }

  if (pressed) {
    return "active";
  }

  return undefined;
};

type ButtonProps = {
  label: string;
  variant?: ButtonVariants;
  size?: Sizes;
  disabled?: boolean;
  onPress?: () => void;
  isLoading?: boolean;
  leftIcon?: Icons;
  rightIcon?: Icons;
  accessibilityLabel?: string;
};

export const Button = ({
  label,
  variant = "primary",
  size = "S",
  disabled = false,
  onPress,
  isLoading = false,
  leftIcon,
  rightIcon,
  accessibilityLabel,
}: ButtonProps) => {
  return (
    <Pressable
      disabled={disabled || isLoading}
      onPress={onPress}
      accessibilityLabel={accessibilityLabel ?? label}
      accessibilityRole="button"
      accessibilityValue={isLoading ? { text: "Loading" } : undefined} //TODO: this should be translated
    >
      {({ pressed }) => (
        <View style={styles.contentContainer(variant, pressed, size, disabled)}>
          <ButtonContent
            isLoading={isLoading}
            disabled={disabled}
            label={label}
            pressed={pressed}
            size={size}
            variant={variant}
            leftIcon={leftIcon}
            rightIcon={rightIcon}
          />
        </View>
      )}
    </Pressable>
  );
};

type ButtonContentProps = {
  isLoading: boolean;
  pressed: boolean;
  disabled: boolean;
  label: string;
  variant: ButtonVariants;
  size: Sizes;
  leftIcon?: Icons;
  rightIcon?: Icons;
};
const ButtonContent = ({
  isLoading,
  pressed,
  disabled,
  label,
  variant,
  size,
  leftIcon,
  rightIcon,
}: ButtonContentProps) => {
  const { theme } = useUnistyles();

  if (isLoading) {
    return (
      <Loader
        size={theme.components.button.size[size]["icon-size"]}
        color={getStyleKeyByState(
          theme,
          `components.button.level.${variant}`,
          getButtonStyleState({ pressed, disabled }),
          "content-color",
        )}
      />
    );
  }

  return (
    <>
      {leftIcon && (
        <Icon
          size={theme.components.button.size[size]["icon-size"]}
          icon={leftIcon}
          color={getStyleKeyByState(
            theme,
            `components.button.level.${variant}`,
            getButtonStyleState({ pressed, disabled }),
            "content-color",
          )}
        />
      )}
      <Typography
        variant="Text.P1.Label"
        color={getStyleKeyByState(
          theme,
          `components.button.level.${variant}`,
          getButtonStyleState({ pressed, disabled }),
          "content-color",
        )}
      >
        {label}
      </Typography>
      {rightIcon && (
        <Icon
          size={theme.components.button.size[size]["icon-size"]}
          icon={rightIcon}
          color={getStyleKeyByState(
            theme,
            `components.button.level.${variant}`,
            getButtonStyleState({ pressed, disabled }),
            "content-color",
          )}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create(({ components }) => ({
  contentContainer: (
    variant: ButtonVariants,
    pressed: boolean,
    size: Sizes,
    disabled: boolean,
  ) => {
    const borderWidth = components.button.level[variant]["border-size"];

    return {
      paddingHorizontal: components.button["horizontal-padding"] - borderWidth,
      paddingVertical:
        components.button.size[size]["vertical-padding"] - borderWidth,
      minHeight: components.button.size[size]["height"],
      gap: components.button.gap,

      backgroundColor: getStyleValueByState(
        components.button.level[variant],
        getButtonStyleState({ pressed, disabled }),
        "background-color",
      ),

      borderRadius: components.button["corner-radius"],

      borderColor: getStyleValueByState(
        components.button.level[variant],
        getButtonStyleState({ pressed, disabled }),
        "border-color",
      ),

      borderWidth,

      alignItems: "center",
      flexDirection: "row",
      justifyContent: "center",
    };
  },
}));

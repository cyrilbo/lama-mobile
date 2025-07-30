import { Text, type TextProps } from "react-native";
import { StyleSheet } from "react-native-unistyles";

import {
  type ColorKeyPaths,
  getColorKeyPath,
  getTypographyWithKey,
  type TypographyKeyPaths,
} from "../../helpers/getters";

type TypographyProps = TextProps & {
  children: React.ReactNode;
  variant?: TypographyKeyPaths;
  color?: ColorKeyPaths;
};

export const Typography = ({
  children,
  color = "colors.text.highest",
  variant = "Text.P1.Paragraph",
  ...textProps
}: TypographyProps) => {
  return (
    <Text style={styles.typography(variant, color)} {...textProps}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create((theme) => ({
  typography: (variant: TypographyKeyPaths, color: ColorKeyPaths) => {
    const props = getTypographyWithKey(variant);

    return {
      ...props,
      color: getColorKeyPath(theme, color),
    };
  },
}));

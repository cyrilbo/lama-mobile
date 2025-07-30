import { Pressable, View } from "react-native";

import { type ColorKeyPaths, getColorKeyPath } from "../helpers/getters";
import { iconCatalog, type Icons } from "./iconCatalog";
import { useUnistyles } from "react-native-unistyles";

export const Icon = ({
  icon,
  color = "colors.primary.highest",
  size = 20,
}: {
  icon: Icons;
  color?: ColorKeyPaths;
  size?: number;
}) => {
  const { theme } = useUnistyles();
  const colorValue = getColorKeyPath(theme, color);

  const IconComponent = iconCatalog[icon];
  return (
    <View testID={`${icon}-icon`}>
      <IconComponent size={size} color={colorValue} />
    </View>
  );
};

export const IconButton = ({
  color,
  icon,
  onPress,
  size = 20,
  disabled,
}: {
  icon: Icons;
  onPress?: () => void;
  color?: ColorKeyPaths;
  size?: number;
  disabled?: boolean;
}) => {
  return (
    <Pressable onPress={onPress} disabled={disabled}>
      <Icon icon={icon} color={color} size={size} />
    </Pressable>
  );
};

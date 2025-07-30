import { ActivityIndicator } from "react-native";
import { useUnistyles } from "react-native-unistyles";

import { ColorKeyPaths, getColorKeyPath } from "../../helpers/getters";

// Constant from react-native
const LARGE_ACTIVITY_INDICATOR_SIZE = 36;

// TODO replace this with a custom animated loader
// this is a little hacky and also layout is a bit buggy on iOS
export const Loader = ({
  size = 24,
  color = "colors.primary.highest",
}: {
  size?: number;
  color?: ColorKeyPaths;
}) => {
  const { theme } = useUnistyles();
  const actualColor = getColorKeyPath(theme, color);
  return (
    <ActivityIndicator
      size="large"
      color={actualColor}
      style={{
        // TODO dirty hack to handle all loader sizes
        transform: [{ scale: size / LARGE_ACTIVITY_INDICATOR_SIZE }],
        width: size,
        height: size,
      }}
    />
  );
};

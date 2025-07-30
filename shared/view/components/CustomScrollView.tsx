import type { ScrollViewProps } from "react-native";
import { ScrollView } from "react-native";

export const CustomScrollView = ({
  showsVerticalScrollIndicator = false,
  alwaysBounceVertical = false,
  alwaysBounceHorizontal = false,
  keyboardShouldPersistTaps = "handled",
  contentContainerStyle = { flexGrow: 1 },
  children,
  ...props
}: ScrollViewProps) => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={showsVerticalScrollIndicator}
      alwaysBounceVertical={alwaysBounceVertical}
      alwaysBounceHorizontal={alwaysBounceHorizontal}
      keyboardShouldPersistTaps={keyboardShouldPersistTaps}
      contentContainerStyle={contentContainerStyle}
      {...props}
    >
      {children}
    </ScrollView>
  );
};

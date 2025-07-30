import { View, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { QueryBoundaries } from "./QueryBoundaries";
import { Spacer } from "./Spacer";

type Props = {
  header?: React.ReactNode;
  children: React.ReactNode;
};

export const ScreenTemplate = ({ header, children }: Props) => {
  const { top, bottom } = useSafeAreaInsets();

  return (
    <View style={styles.screenContainer}>
      {header ?? <Spacer vertical={top} />}
      <QueryBoundaries>
        {children}
        <Spacer vertical={bottom} />
      </QueryBoundaries>
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
});

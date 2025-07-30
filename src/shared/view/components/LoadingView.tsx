import { ActivityIndicator, View, StyleSheet } from "react-native";

export const LoaderView = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" testID="activity-indicator" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    alignItems: "center",
  },
});

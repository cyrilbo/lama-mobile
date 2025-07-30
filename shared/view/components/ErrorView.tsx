import { View, StyleSheet, Text, Button } from "react-native";

import { Spacer } from "./Spacer";

type Props = {
  error: Error;
  onRetry: () => void;
};

export const ErrorView = ({ error, onRetry }: Props) => {
  return (
    <View style={styles.container}>
      <Text>{error.message}</Text>
      <Spacer vertical={100} />
      <Button onPress={onRetry} title="Retry" />
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

import { View, StyleSheet, Button } from "react-native";

import { Spacer } from "./Spacer";
import { useLingui } from "@lingui/react/macro";
import { Typography } from "../ui-kit/components/Typography/Typography";

type Props = {
  error: Error;
  onRetry: () => void;
};

export const ErrorView = ({ onRetry }: Props) => {
  const { t } = useLingui();
  return (
    <View style={styles.container}>
      <Typography variant="Title.H3" style={styles.title}>
        {t({ id: "error.title", message: "An error occurred" })}
      </Typography>
      <Spacer vertical={100} />
      <Button
        onPress={onRetry}
        title={t({ id: "error.retry", message: "Retry" })}
      />
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
  title: {
    textAlign: "center",
  },
});

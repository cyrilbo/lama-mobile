import { View } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import { Installment } from "../../shared/domain/payment.types";
import { Typography } from "@/src/shared/view/ui-kit/components/Typography/Typography";
import {
  useAmountFormatter,
  useTimestampFormatter,
} from "@/src/shared/view/helpers/formatters";
import { Trans } from "@lingui/react/macro";

type Props = {
  installment: Installment;
};

export const NextInstallmentOverview = ({ installment }: Props) => {
  const { formatAmount } = useAmountFormatter();
  const { formatTimestamp } = useTimestampFormatter();

  return (
    <View style={styles.container}>
      <View>
        <Typography variant="Text.P2.Paragraph">
          <Trans>Next installment</Trans>
        </Typography>
        <Typography variant="Text.P1.Important">
          {formatTimestamp(installment.due_date)}
        </Typography>
      </View>
      <View>
        <Typography variant="Title.H3">
          {formatAmount(installment.purchase_amount)}
        </Typography>
      </View>
    </View>
  );
};

const styles = StyleSheet.create((theme) => ({
  container: {
    padding: 16,
    backgroundColor: theme.colors.warning.lower,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
}));

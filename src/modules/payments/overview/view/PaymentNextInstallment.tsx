import { View } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import { Payment } from "../../shared/domain/payment.types";
import { Typography } from "@/src/shared/view/ui-kit/components/Typography/Typography";
import {
  formatAmount,
  formatTimestamp,
} from "@/src/shared/view/helpers/formatters";
import { Trans } from "@lingui/react/macro";

type Props = {
  payment: Payment;
};

export const PaymentNextInstallment = ({ payment }: Props) => {
  const nextInstallment = payment.payment_plan
    .filter((plan) => plan.state === "pending")
    .sort((a, b) => a.due_date - b.due_date)[0];

  if (!nextInstallment) {
    return null;
  }
  return (
    <View style={styles.container}>
      <View>
        <Typography variant="Text.P2.Paragraph">
          <Trans>Next installment</Trans>
        </Typography>
        <Typography variant="Text.P1.Important">
          {formatTimestamp(nextInstallment.due_date)}
        </Typography>
      </View>
      <View>
        <Typography variant="Title.H3">
          {formatAmount(nextInstallment.purchase_amount)}
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

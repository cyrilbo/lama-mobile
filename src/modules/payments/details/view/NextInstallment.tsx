import { View } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import { Trans, useLingui } from "@lingui/react/macro";
import { Typography } from "@/src/shared/view/ui-kit/components/Typography/Typography";
import { Icon } from "@/src/shared/view/ui-kit/icons/Icon";
import {
  useAmountFormatter,
  useTimestampFormatter,
  useDayFormatter,
} from "@/src/shared/view/helpers/formatters";
import { Customer, Installment } from "../../shared/domain/payment.types";
import { Spacer } from "@/src/shared/view/components/Spacer";
import { Button } from "@/src/shared/view/ui-kit/components/Button/Button";

type Props = {
  installment: Installment;
  customer: Customer;
};

export const NextInstallment = ({ installment, customer }: Props) => {
  const { formatAmount } = useAmountFormatter();
  const { formatTimestamp } = useTimestampFormatter();
  const { formatDay } = useDayFormatter();
  const { t } = useLingui();

  return (
    <View style={styles.container}>
      <Typography variant="Title.H3">
        <Trans>Next installment</Trans>
      </Typography>

      <Spacer vertical={16} />

      <View style={styles.infoItem}>
        <Icon icon="DollarSign" size={20} />
        <Typography variant="Text.P1.Important">
          <Trans>Amount</Trans>
        </Typography>
        <View style={{ flex: 1, alignItems: "flex-end" }}>
          <Typography variant="Title.H3">
            {formatAmount(installment.purchase_amount)}
          </Typography>
        </View>
      </View>

      <Spacer vertical={16} />

      <View style={styles.infoItem}>
        <Icon icon="Calendar" size={20} />

        <Typography variant="Text.P1.Important">
          <Trans>Date</Trans>
        </Typography>
        <View style={{ flex: 1, alignItems: "flex-end" }}>
          <Typography variant="Title.H3">
            {formatTimestamp(installment.due_date)}
          </Typography>
        </View>
      </View>
      <Spacer vertical={8} />
      <Button label={t`Postpone *`} size="XS" />
      {installment.customer_can_postpone_until && (
        <Typography variant="Text.P2.Paragraph" style={{ textAlign: "center" }}>
          <Trans>
            * You can postpone your next installment until{" "}
            {formatDay(installment.customer_can_postpone_until)}
          </Trans>
        </Typography>
      )}
      <Spacer vertical={16} />

      <View style={styles.infoItem}>
        <Icon icon="CreditCard" size={20} />
        <Typography variant="Text.P1.Important">
          <Trans>Charged card</Trans>
        </Typography>
        <View style={{ flex: 1, alignItems: "flex-end" }}>
          <Typography variant="Title.H3">
            {`•••• •••• •••• ${customer.card.last4}`}
          </Typography>
          <Typography variant="Title.H3">
            <Trans>
              {`Exp ${customer.card.exp_month}/${customer.card.exp_year}`}
            </Trans>
          </Typography>
        </View>
      </View>
      <Spacer vertical={8} />
      <Button label="Changer de carte" size="XS" />
    </View>
  );
};

const styles = StyleSheet.create((theme) => ({
  container: {
    backgroundColor: theme.colors.warning.lower,
    borderRadius: 12,
    padding: 16,
  },
  infoItem: {
    flexDirection: "row",
    gap: 4,
  },
}));

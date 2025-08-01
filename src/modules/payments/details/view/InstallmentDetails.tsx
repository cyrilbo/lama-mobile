import { View } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import { useLingui } from "@lingui/react/macro";
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

export const InstallmentDetails = ({ installment, customer }: Props) => {
  const { formatAmount } = useAmountFormatter();
  const { formatTimestamp } = useTimestampFormatter();
  const { formatDay } = useDayFormatter();
  const { t } = useLingui();

  return (
    <View>
      <View style={styles.infoItem}>
        <Icon icon="DollarSign" size={20} />
        <Typography variant="Text.P1.Important">
          {t({
            id: "payment.details.amount.label",
            message: "Amount",
          })}
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
          {t({
            id: "payment.details.date.label",
            message: "Date",
          })}
        </Typography>
        <View style={{ flex: 1, alignItems: "flex-end" }}>
          <Typography variant="Title.H3">
            {formatTimestamp(installment.due_date)}
          </Typography>
        </View>
      </View>
      {installment.customer_can_postpone_until && (
        <>
          <Spacer vertical={8} />
          <Button
            label={t({
              id: "payment.details.postpone.cta",
              message: "Postpone *",
            })}
            size="XS"
          />
          <Typography
            variant="Text.P2.Paragraph"
            style={{ textAlign: "center" }}
          >
            {t({
              id: "payment.details.date.postpone.caption",
              message: `You can postpone your next installment until ${formatDay(installment.customer_can_postpone_until)}`,
            })}
          </Typography>
        </>
      )}
      <Spacer vertical={16} />

      <View style={styles.infoItem}>
        <Icon icon="CreditCard" size={20} />
        <Typography variant="Text.P1.Important">
          {t({
            id: "payment.details.charged_card.label",
            message: "Charged card",
          })}
        </Typography>
        <View style={{ flex: 1, alignItems: "flex-end" }}>
          <Typography variant="Title.H3">
            {`•••• •••• •••• ${customer.card.last4}`}
          </Typography>
          <Typography variant="Title.H3">
            {t({
              id: "payment.details.charged_card.expiry",
              message: `Exp ${customer.card.exp_month}/${customer.card.exp_year}`,
            })}
          </Typography>
        </View>
      </View>
      {installment.state === "pending" && (
        <>
          <Spacer vertical={8} />
          <Button
            label={t({
              id: "payment.details.charged_card.change_card.cta",
              message: "Change card",
            })}
            size="XS"
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  infoItem: {
    flexDirection: "row",
    gap: 4,
  },
});

import { Payment } from "../../shared/domain/payment.types";
import { View } from "react-native";
import { Typography } from "@/src/shared/view/ui-kit/components/Typography/Typography";
import { useLingui } from "@lingui/react/macro";
import { Spacer } from "@/src/shared/view/components/Spacer";
import { PaymentPlanTimelineItem } from "./PaymentPlanItem";
type Props = {
  payment: Payment;
};

export const PaymentPlan = ({ payment }: Props) => {
  const { t } = useLingui();
  return (
    <View>
      <Typography variant="Title.H3">
        {t({
          id: "payment.details.payment_plan.title",
          message: "Payment plan",
        })}
      </Typography>
      <Spacer vertical={16} />
      {payment.payment_plan.map((installment, index) => {
        return (
          <View key={installment.id}>
            <PaymentPlanTimelineItem
              installment={installment}
              isLast={index === payment.payment_plan.length - 1}
            />
            <Spacer vertical={8} />
          </View>
        );
      })}
    </View>
  );
};

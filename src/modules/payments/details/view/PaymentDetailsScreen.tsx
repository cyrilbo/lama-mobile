import { ScreenTemplate } from "@/src/shared/view/components/ScreenTemplate";
import React from "react";
import { useGetPaymentDetails } from "../infra/useGetPaymentDetails";
import { CustomScrollView } from "@/src/shared/view/components/CustomScrollView";
import { Spacer } from "@/src/shared/view/components/Spacer";
import { View } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import { PaymentHeader } from "./PaymentHeader";
import { InstallmentDetails } from "./InstallmentDetails";
import { getNextInstallment } from "../../shared/domain/payment.helpers";
import { PaymentPlan } from "./PaymentPlan";
import { Typography } from "@/src/shared/view/ui-kit/components/Typography/Typography";
import { useLingui } from "@lingui/react/macro";

type Props = {
  paymentId: string;
};

const PaymentDetailsContent = ({ paymentId }: Props) => {
  const { t } = useLingui();

  const { data: payment } = useGetPaymentDetails(paymentId);
  const nextInstallment = getNextInstallment(payment);

  return (
    <View style={styles.container}>
      <PaymentHeader payment={payment} />
      <Spacer vertical={16} />
      <CustomScrollView>
        {nextInstallment && (
          <View style={styles.nextInstallmentContainer}>
            <Typography variant="Title.H3">
              {t({
                id: "payment.details.next_installment.title",
                message: "Next installment",
              })}
            </Typography>

            <Spacer vertical={16} />
            <InstallmentDetails
              installment={nextInstallment}
              customer={payment.customer}
            />
          </View>
        )}
        <Spacer vertical={16} />
        <PaymentPlan payment={payment} />
      </CustomScrollView>
    </View>
  );
};

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  nextInstallmentContainer: {
    backgroundColor: theme.colors.warning.lower,
    borderRadius: 12,
    padding: 16,
  },
}));

export const PaymentDetailsScreen = ({ paymentId }: Props) => {
  return (
    <ScreenTemplate>
      <PaymentDetailsContent paymentId={paymentId} />
    </ScreenTemplate>
  );
};

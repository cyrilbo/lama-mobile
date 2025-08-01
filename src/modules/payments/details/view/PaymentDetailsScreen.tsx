import { ScreenTemplate } from "@/src/shared/view/components/ScreenTemplate";
import React from "react";
import { useGetPaymentDetails } from "../infra/useGetPaymentDetails";
import { CustomScrollView } from "@/src/shared/view/components/CustomScrollView";
import { Spacer } from "@/src/shared/view/components/Spacer";
import { View } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import { PaymentHeader } from "./PaymentHeader";
import { NextInstallment } from "./NextInstallment";
import { getNextInstallment } from "../../shared/domain/payment.helpers";

type Props = {
  paymentId: string;
};

const PaymentDetailsContent = ({ paymentId }: Props) => {
  const { data: payment } = useGetPaymentDetails(paymentId);
  const nextInstallment = getNextInstallment(payment);

  return (
    <View style={styles.container}>
      <PaymentHeader payment={payment} />
      <Spacer vertical={16} />
      <CustomScrollView>
        {nextInstallment && (
          <NextInstallment
            installment={nextInstallment}
            customer={payment.customer}
          />
        )}
      </CustomScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
});

export const PaymentDetailsScreen = ({ paymentId }: Props) => {
  return (
    <ScreenTemplate>
      <PaymentDetailsContent paymentId={paymentId} />
    </ScreenTemplate>
  );
};

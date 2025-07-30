import { ScreenTemplate } from "@/src/shared/view/components/ScreenTemplate";
import { Typography } from "@/src/shared/view/ui-kit/components/Typography/Typography";
import React from "react";
import { useGetPaymentDetails } from "../infra/useGetPaymentDetails";
import { useLocalSearchParams } from "expo-router";
import { CustomScrollView } from "@/src/shared/view/components/CustomScrollView";

const PaymentDetailsContent = () => {
  const { paymentId } = useLocalSearchParams<{ paymentId: string }>();

  const { data: payment } = useGetPaymentDetails(paymentId);

  return (
    <CustomScrollView>
      <Typography variant="Title.H1">
        {payment.merchant_display_name}
      </Typography>
      <Typography variant="Text.Caption.Paragraph">
        {JSON.stringify(payment, null, 2)}
      </Typography>
    </CustomScrollView>
  );
};

export const PaymentDetailsScreen = () => {
  return (
    <ScreenTemplate>
      <PaymentDetailsContent />
    </ScreenTemplate>
  );
};

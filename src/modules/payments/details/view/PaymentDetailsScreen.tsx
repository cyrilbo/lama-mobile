import { ScreenTemplate } from "@/src/shared/view/components/ScreenTemplate";
import React from "react";
import { useGetPaymentDetails } from "../infra/useGetPaymentDetails";
import { useLocalSearchParams } from "expo-router";
import { CustomScrollView } from "@/src/shared/view/components/CustomScrollView";
import { Spacer } from "@/src/shared/view/components/Spacer";
import { View } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import { PaymentHeader } from "./PaymentHeader";
import { NextInstallment } from "./NextInstallment";

const PaymentDetailsContent = () => {
  const { paymentId } = useLocalSearchParams<{ paymentId: string }>();

  const { data: payment } = useGetPaymentDetails(paymentId);

  return (
    <View style={styles.container}>
      <PaymentHeader payment={payment} />
      <Spacer vertical={16} />
      <CustomScrollView>
        <NextInstallment payment={payment} />
      </CustomScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
});

export const PaymentDetailsScreen = () => {
  return (
    <ScreenTemplate>
      <PaymentDetailsContent />
    </ScreenTemplate>
  );
};

import { ScreenTemplate } from "@/src/shared/view/components/ScreenTemplate";
import { Pressable, View } from "react-native";
import { useGetPayments } from "../infra/useGetPayments";
import { StyleSheet } from "react-native-unistyles";
import { Typography } from "@/src/shared/view/ui-kit/components/Typography/Typography";
import { Spacer } from "@/src/shared/view/components/Spacer";
import { useAmountFormatter } from "@/src/shared/view/helpers/formatters";
import { useRouter } from "expo-router";
import { useLingui } from "@lingui/react/macro";
import { useMemo, useState } from "react";
import { PaymentTabs } from "./PaymentTabs";
import { PaymentState } from "../../shared/domain/payment.types";
import { PaymentList } from "./PaymentList";

const PaymentsOverviewContent = () => {
  const { formatAmount } = useAmountFormatter();
  const { t } = useLingui();

  const { data: payments } = useGetPayments();
  const router = useRouter();
  const [selectedPaymentState, setSelectedPaymentState] =
    useState<PaymentState>("in_progress");
  const paymentsToRender = useMemo(() => {
    return payments?.payments.filter((payment) => {
      return selectedPaymentState === payment.state;
    });
  }, [payments, selectedPaymentState]);

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.totalAmountToPayContainer}
        onLongPress={() => {
          if (__DEV__) {
            router.navigate({
              pathname: "/ui-kit",
            });
          }
        }}
      >
        <Typography variant="Text.P1.Important">
          {t({
            id: "payment.overview.total_amount_to_pay.label",
            message: "Total amount to pay",
          })}
        </Typography>
        <Typography variant="Title.H1">
          {formatAmount(payments.total_amount_left_to_pay)}
        </Typography>
      </Pressable>
      <Spacer vertical={16} />
      <Typography variant="Title.H2">
        {t({
          id: "payment.overview.my_payments.title",
          message: "My Payments",
        })}
      </Typography>
      <Spacer vertical={16} />

      <PaymentTabs
        selectedPaymentState={selectedPaymentState}
        setSelectedPaymentState={setSelectedPaymentState}
      />
      <Spacer vertical={16} />
      <PaymentList payments={paymentsToRender} />
    </View>
  );
};

export const PaymentsOverviewScreen = () => {
  return (
    <ScreenTemplate>
      <PaymentsOverviewContent />
    </ScreenTemplate>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  totalAmountToPayContainer: {
    alignItems: "center",
  },
});

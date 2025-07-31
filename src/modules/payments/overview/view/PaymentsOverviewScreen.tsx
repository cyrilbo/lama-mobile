import { ScreenTemplate } from "@/src/shared/view/components/ScreenTemplate";
import { FlatList, Pressable, View } from "react-native";
import { useGetPayments } from "../infra/useGetPayments";
import { PaymentListItem } from "./PaymentListItem";
import { StyleSheet } from "react-native-unistyles";
import { Typography } from "@/src/shared/view/ui-kit/components/Typography/Typography";
import { Spacer } from "@/src/shared/view/components/Spacer";
import { useAmountFormatter } from "@/src/shared/view/helpers/formatters";
import { useRouter } from "expo-router";
import { Trans } from "@lingui/react/macro";
import { useMemo, useState } from "react";
import { PaymentTabs } from "./PaymentTabs";
import { PaymentState } from "../../shared/domain/payment.types";

const PaymentsOverviewContent = () => {
  const { formatAmount } = useAmountFormatter();
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
        style={{ alignItems: "center" }}
        onLongPress={() => {
          if (__DEV__) {
            router.navigate({
              pathname: "/ui-kit",
            });
          }
        }}
      >
        <Typography variant="Text.P1.Important">
          <Trans>Total amount to pay</Trans>
        </Typography>
        <Typography variant="Title.H1">
          {formatAmount(payments.total_amount_left_to_pay)}
        </Typography>
      </Pressable>
      <Spacer vertical={16} />
      <Typography variant="Title.H2">
        <Trans>My Payments</Trans>
      </Typography>
      <Spacer vertical={16} />

      <PaymentTabs
        selectedPaymentState={selectedPaymentState}
        setSelectedPaymentState={setSelectedPaymentState}
      />
      <Spacer vertical={16} />
      <FlatList
        data={paymentsToRender}
        renderItem={({ item }) => <PaymentListItem payment={item} />}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <Spacer vertical={16} />}
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyListContainer}>
            <Typography variant="Text.P1.Important">
              <Trans>No payments found</Trans>
            </Typography>
          </View>
        }
      />
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
  emptyListContainer: {
    alignItems: "center",
  },
});

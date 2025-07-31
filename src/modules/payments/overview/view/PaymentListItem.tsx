import { TouchableOpacity, View } from "react-native";
import { Payment } from "../../shared/domain/payment.types";
import { Typography } from "@/src/shared/view/ui-kit/components/Typography/Typography";
import { PaymentProgress } from "./PaymentProgress";
import { Spacer } from "@/src/shared/view/ui-kit/components/Spacer/Spacer";
import { StyleSheet } from "react-native-unistyles";
import { PaymentNextInstallment } from "./PaymentNextInstallment";
import {
  useAmountFormatter,
  useTimestampFormatter,
} from "@/src/shared/view/helpers/formatters";
import { useRouter } from "expo-router";
import React from "react";
import { MerchantLogo } from "./MerchantLogo";
import { computeRemainingAmountToPay } from "../../shared/domain/payment.helpers";
import { Trans } from "@lingui/react/macro";

type Props = {
  payment: Payment;
};

export const PaymentListItem = ({ payment }: Props) => {
  const router = useRouter();
  const { formatAmount } = useAmountFormatter();
  const { formatTimestamp } = useTimestampFormatter();
  const remainingAmountToPay = computeRemainingAmountToPay(payment);

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        router.navigate({
          pathname: "/payment/[paymentId]",
          params: { paymentId: payment.id },
        });
      }}
    >
      <View style={styles.row}>
        <MerchantLogo
          logoUrl={
            payment.id === "payment_121IopV7OU4kX5pMradVJfGAQzSJz7MGy2"
              ? "https://substackcdn.com/image/fetch/$s_!G1lk!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F8ed3d547-94ff-48e1-9f20-8c14a7030a02_2000x2000.jpeg"
              : payment.logo_url
          }
          merchantName={payment.merchant_display_name}
        />
        <Spacer horizontal={16} />
        <View style={styles.rowContainer}>
          <View>
            <Typography variant="Text.P2.Important" color="colors.text.medium">
              {formatTimestamp(payment.created)}
            </Typography>
            <Typography variant="Text.P1.Important">
              {payment.merchant_display_name}
            </Typography>
          </View>
          <Typography variant="Title.H3">
            {formatAmount(payment.purchase_amount)}
          </Typography>
        </View>
      </View>
      <Spacer vertical={16} />
      <Typography variant="Text.P2.Paragraph" style={{ textAlign: "right" }}>
        <Trans>
          Remaining to be paid:{" "}
          <Typography variant="Text.P1.Important">
            {formatAmount(remainingAmountToPay)}
          </Typography>
        </Trans>
      </Typography>
      <Spacer vertical={16} />
      <PaymentProgress payment={payment} />

      <Spacer vertical={16} />
      <PaymentNextInstallment payment={payment} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create((theme) => ({
  container: {
    borderRadius: 12,
    padding: 12,
    backgroundColor: theme.colors.neutral.white,
  },
  row: {
    flexDirection: "row",
  },
  rowContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
}));

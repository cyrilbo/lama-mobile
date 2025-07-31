import { Typography } from "@/src/shared/view/ui-kit/components/Typography/Typography";
import { MerchantLogo } from "../../overview/view/MerchantLogo";
import { Payment } from "../../shared/domain/payment.types";
import { TouchableOpacity, View } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import { useAmountFormatter } from "@/src/shared/view/helpers/formatters";
import { PaymentStateTag } from "./PaymentStateTag";
import { Icon } from "@/src/shared/view/ui-kit/icons/Icon";
import { Spacer } from "@/src/shared/view/components/Spacer";
import { useRouter } from "expo-router";

type Props = {
  payment: Payment;
};

export const PaymentHeader = ({ payment }: Props) => {
  const { formatAmount } = useAmountFormatter();
  const router = useRouter();
  return (
    <>
      <Spacer vertical={16} />
      <TouchableOpacity onPress={() => router.back()}>
        <Icon icon="ArrowLeft" size={24} />
      </TouchableOpacity>
      <Spacer vertical={16} />
      <View style={styles.container}>
        <MerchantLogo
          logoUrl={
            payment.id === "payment_121IopV7OU4kX5pMradVJfGAQzSJz7MGy2"
              ? "https://substackcdn.com/image/fetch/$s_!G1lk!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F8ed3d547-94ff-48e1-9f20-8c14a7030a02_2000x2000.jpeg"
              : payment.logo_url
          }
          merchantName={payment.merchant_display_name}
        />
        <View style={styles.column}>
          <Typography variant="Title.H3">
            {payment.merchant_display_name}
          </Typography>
          <Typography variant="Title.H1">
            {formatAmount(payment.purchase_amount)}
          </Typography>
        </View>
        <PaymentStateTag paymentState={payment.state} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  column: {
    flex: 1,
  },
});

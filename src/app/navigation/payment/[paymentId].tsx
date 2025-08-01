import { PaymentDetailsScreen } from "@/src/modules/payments/details/view/PaymentDetailsScreen";
import { useLocalSearchParams } from "expo-router";

export default function PaymentDetails() {
  const { paymentId } = useLocalSearchParams<{ paymentId: string }>();

  return <PaymentDetailsScreen paymentId={paymentId} />;
}

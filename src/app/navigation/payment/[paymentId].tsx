import { PaymentDetailsScreen } from "@/src/modules/payments/details/view/PaymentDetailsScreen";
import { ScreenTemplate } from "@/src/shared/view/components/ScreenTemplate";

export default function PaymentDetails() {
  console.log("PaymentDetailsScreen");
  return (
    <ScreenTemplate>
      <PaymentDetailsScreen />
    </ScreenTemplate>
  );
}

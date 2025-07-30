import { View } from "react-native";
import { StyleSheet, useUnistyles } from "react-native-unistyles";
import { Payment } from "../../shared/domain/payment.types";

type Props = {
  payment: Payment;
};

export const PaymentProgress = ({ payment }: Props) => {
  const { theme } = useUnistyles();
  const { payment_plan } = payment;

  return (
    <View style={styles.progressBarContainer}>
      {payment_plan.map((plan) => (
        <View
          key={plan.id}
          style={[
            styles.progressBarItem,
            {
              backgroundColor:
                plan.state === "paid"
                  ? theme.colors.secondary.highest
                  : theme.colors.neutral.lower,
            },
          ]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  progressBarContainer: {
    flexDirection: "row",
    gap: 4,
  },
  progressBarItem: {
    borderRadius: 4,
    height: 8,
    flex: 1,
  },
});

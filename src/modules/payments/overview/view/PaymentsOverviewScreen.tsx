import { ScreenTemplate } from "@/src/shared/view/components/ScreenTemplate";
import { Text } from "react-native";
import { useGetPayments } from "../infra/useGetPayments";
import { CustomScrollView } from "@/src/shared/view/components/CustomScrollView";

const PaymentsOverviewContent = () => {
  const { data: payments } = useGetPayments();
  return (
    <CustomScrollView>
      <Text style={{ color: "white" }}>Payments Overview</Text>
      <Text style={{ color: "white" }}>
        {JSON.stringify(payments, null, 2)}
      </Text>
    </CustomScrollView>
  );
};

export const PaymentsOverviewScreen = () => {
  return (
    <ScreenTemplate>
      <PaymentsOverviewContent />
    </ScreenTemplate>
  );
};

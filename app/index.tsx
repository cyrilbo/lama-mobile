import { getPaymentsConnector } from "@/modules/payments/overview/infra/getPayments.connector";

import { Button, Text, View } from "react-native";

export default function Home() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ color: "white" }}>Home</Text>
      <Button
        title="Get payments"
        onPress={async () => {
          const payments = await getPaymentsConnector();
          console.log(payments);
        }}
      />
    </View>
  );
}

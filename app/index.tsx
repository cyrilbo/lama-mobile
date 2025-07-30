import { httpClient } from "@/shared/infra/httpClient";
import { Button, Text, View } from "react-native";

export default function Home() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ color: "white" }}>Home</Text>
      <Button
        title="Get payments"
        onPress={() => {
          httpClient.get("/payments").then((res) => {
            console.log(res.data);
          });
        }}
      />
    </View>
  );
}

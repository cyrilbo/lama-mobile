import { ScreenTemplate } from "@/src/shared/view/components/ScreenTemplate";
import { FlatList, Pressable, View } from "react-native";
import { useGetPayments } from "../infra/useGetPayments";
import { PaymentListItem } from "./PaymentListItem";
import { StyleSheet } from "react-native-unistyles";
import { Typography } from "@/src/shared/view/ui-kit/components/Typography/Typography";
import { Spacer } from "@/src/shared/view/components/Spacer";
import { formatAmount } from "@/src/shared/view/helpers/formatters";
import { useRouter } from "expo-router";

const PaymentsOverviewContent = () => {
  const { data: payments } = useGetPayments();
  const router = useRouter();
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
        <Typography variant="Text.P1.Important">Total à payer</Typography>
        <Typography variant="Title.H1">
          {formatAmount(payments.total_amount_left_to_pay)}
        </Typography>
      </Pressable>
      <Spacer vertical={16} />
      <Typography variant="Title.H2">Mes paiements</Typography>
      <Spacer vertical={16} />
      <FlatList
        data={payments?.payments}
        renderItem={({ item }) => <PaymentListItem payment={item} />}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <Spacer vertical={16} />}
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
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
});

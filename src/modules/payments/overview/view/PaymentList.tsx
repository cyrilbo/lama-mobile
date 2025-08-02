import { Spacer } from "@/src/shared/view/components/Spacer";
import { Typography } from "@/src/shared/view/ui-kit/components/Typography/Typography";
import { FlatList, View } from "react-native";
import { Payment } from "../../shared/domain/payment.types";
import { PaymentListItem } from "./PaymentListItem";
import { StyleSheet } from "react-native-unistyles";
import { useLingui } from "@lingui/react/macro";

type Props = {
  payments: Payment[];
};

const ListEmptyComponent = () => {
  const { t } = useLingui();
  return (
    <View style={styles.emptyListContainer}>
      <Typography variant="Text.P1.Important">
        {t({
          id: "payment.overview.no_payments_found",
          message: "No payments found",
        })}
      </Typography>
    </View>
  );
};

const renderItem = ({ item }: { item: Payment }) => {
  return <PaymentListItem payment={item} />;
};

export const PaymentList = ({ payments }: Props) => {
  return (
    <FlatList
      data={payments}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={() => <Spacer vertical={16} />}
      style={styles.list}
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={ListEmptyComponent}
    />
  );
};

const styles = StyleSheet.create({
  emptyListContainer: {
    alignItems: "center",
  },
  list: {
    flex: 1,
  },
});

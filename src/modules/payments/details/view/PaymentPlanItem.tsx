import { View } from "react-native";
import { Customer, Installment } from "../../shared/domain/payment.types";
import { IconButton } from "@/src/shared/view/ui-kit/icons/Icon";
import { Spacer } from "@/src/shared/view/components/Spacer";
import { StyleSheet } from "react-native-unistyles";
import { Typography } from "@/src/shared/view/ui-kit/components/Typography/Typography";
import {
  useAmountFormatter,
  useTimestampFormatter,
} from "@/src/shared/view/helpers/formatters";
import { useLingui } from "@lingui/react/macro";
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
} from "@gorhom/bottom-sheet";
import { useRef, useCallback } from "react";
import { InstallmentDetails } from "./InstallmentDetails";
import { InstallmentStateTag } from "./InstallmentStateTag";
import { PressableWithFeedback } from "@/src/shared/view/components/PressableWithFeedback";

type IconProps = {
  installment: Installment;
};

const Icon = ({ installment }: IconProps) => {
  if (installment.state === "paid") {
    return (
      <IconButton icon="CheckCircle" size={24} color="colors.success.high" />
    );
  } else if (installment.state === "pending") {
    return (
      <IconButton icon="Hourglass" size={24} color="colors.neutral.medium" />
    );
  }
  return null;
};

type Props = {
  installment: Installment;
  customer: Customer;
  index: number;
  totalInstallments: number;
};

export const PaymentPlanTimelineItem = ({
  installment,
  customer,
  index,
  totalInstallments,
}: Props) => {
  const { formatTimestamp } = useTimestampFormatter();
  const { formatAmount } = useAmountFormatter();
  const { t } = useLingui();

  const isLast = index === totalInstallments - 1;

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleDismiss = useCallback(() => {
    bottomSheetModalRef.current?.close();
  }, []);

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        pressBehavior={"close"}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        style={styles.backdrop}
      />
    ),
    [],
  );

  return (
    <>
      <PressableWithFeedback
        style={styles.container}
        onPress={handlePresentModalPress}
      >
        <View style={styles.timelineLeft}>
          <Icon installment={installment} />
          <Spacer vertical={8} />
          {!isLast && <View style={styles.timelineLine} />}
        </View>
        <Spacer horizontal={16} />
        <View
          style={styles.timelineRight({ isPaid: installment.state === "paid" })}
        >
          <Typography variant="Text.P2.Paragraph">
            {formatTimestamp(installment.due_date)}
          </Typography>

          <Typography variant="Title.H2">
            {formatAmount(installment.purchase_amount)}
          </Typography>
          {installment.date_paid && (
            <Typography variant="Text.P2.Paragraph" color="colors.success.high">
              {t({
                id: "payment.details.payment_plan.item.paid_at",
                message: `Paid at ${formatTimestamp(installment.date_paid)}`,
              })}
            </Typography>
          )}
          <Spacer vertical={8} />
        </View>
        <View style={styles.chevron}>
          <IconButton
            icon="ChevronRight"
            size={20}
            color="colors.neutral.medium"
          />
        </View>
      </PressableWithFeedback>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        onDismiss={handleDismiss}
        backdropComponent={renderBackdrop}
      >
        <BottomSheetView style={styles.bottomSheetContentContainer}>
          <View style={styles.bottomSheetHeader}>
            <Typography variant="Title.H3">
              {t({
                id: "payment.details.payment_plan.item.details.title",
                message: `Installment ${index + 1} of ${totalInstallments}`,
              })}
            </Typography>
            <Spacer vertical={8} />
            <InstallmentStateTag installmentState={installment.state} />
          </View>
          <Spacer vertical={32} />
          <InstallmentDetails installment={installment} customer={customer} />
        </BottomSheetView>
      </BottomSheetModal>
    </>
  );
};

const styles = StyleSheet.create((theme, rt) => ({
  bottomSheetContentContainer: {
    flex: 1,
    padding: 16,
    paddingBottom: 16 + rt.insets.bottom,
  },
  bottomSheetHeader: {
    alignItems: "center",
  },
  container: {
    flexDirection: "row",
    borderRadius: 12,
    padding: 8,
  },
  timelineLeft: {
    alignItems: "center",
  },
  timelineRight: ({ isPaid }: { isPaid: boolean }) => ({
    flex: 1,
    opacity: isPaid ? 0.6 : 1,
  }),
  row: {
    flexDirection: "row",
  },
  timelineLine: {
    flex: 1,
    width: 2,
    backgroundColor: theme.colors.neutral.low,
  },
  chevron: {
    alignSelf: "center",
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0)",
  },
}));

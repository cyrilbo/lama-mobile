import { Typography } from "@/src/shared/view/ui-kit/components/Typography/Typography";
import React from "react";
import { Pressable, View, LayoutChangeEvent } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolateColor,
} from "react-native-reanimated";
import { StyleSheet, useUnistyles } from "react-native-unistyles";
import { Payment, PaymentState } from "../../shared/domain/payment.types";
import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";

const TABS = ["in_progress", "completed"] as const satisfies PaymentState[];
const tabsTranslations = {
  in_progress: msg({
    id: "payment.list.filter.in_progress",
    message: "In progress",
  }),
  completed: msg({
    id: "payment.list.filter.completed",
    message: "Completed",
  }),
};

type Props = {
  selectedPaymentState: Payment["state"];
  setSelectedPaymentState: (state: Payment["state"]) => void;
};

const AnimatedTypography = Animated.createAnimatedComponent(Typography);

export function PaymentTabs({
  selectedPaymentState,
  setSelectedPaymentState,
}: Props) {
  const { theme } = useUnistyles();
  const { _ } = useLingui();

  const progress = useSharedValue(
    TABS.findIndex((tab) => tab === selectedPaymentState),
  );
  const containerWidth = useSharedValue(0);

  const onSelect = (index: number) => {
    const selectedTab = TABS[index];
    if (!selectedTab) {
      return;
    }
    setSelectedPaymentState(selectedTab);
    progress.value = withTiming(index, { duration: 250 });
  };

  const onLayout = (event: LayoutChangeEvent) => {
    containerWidth.value = event.nativeEvent.layout.width;
  };

  const sliderStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: progress.value * (containerWidth.value / 2),
      },
    ],
  }));

  const firstTabTextStyle = useAnimatedStyle(() => {
    const color = interpolateColor(
      progress.value,
      [0, 1],
      [theme.colors.neutral.white, theme.colors.neutral.black],
    );
    return { color };
  });

  const secondTabTextStyle = useAnimatedStyle(() => {
    const color = interpolateColor(
      progress.value,
      [0, 1],
      [theme.colors.neutral.black, theme.colors.neutral.white],
    );
    return { color };
  });

  const textStyles = [firstTabTextStyle, secondTabTextStyle];

  return (
    <View style={styles.container}>
      <View style={styles.tabContainer} onLayout={onLayout}>
        <Animated.View style={[styles.slider, sliderStyle]} />
        {TABS.map((state, index) => (
          <Pressable
            key={state}
            style={styles.tab}
            onPress={() => onSelect(index)}
          >
            <AnimatedTypography
              aria-selected={state === selectedPaymentState}
              variant="Text.P2.Important"
              style={textStyles[index]}
            >
              {_(tabsTranslations[state])}
            </AnimatedTypography>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    backgroundColor: theme.colors.neutral.white,
    padding: 6,
    borderRadius: 32,
  },
  tabContainer: {
    flexDirection: "row",
    backgroundColor: theme.colors.neutral.white,
    borderRadius: 12,
    overflow: "hidden",
    position: "relative",
  },
  tab: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 6,
    zIndex: 1,
  },
  slider: {
    position: "absolute",
    height: "100%",
    width: "50%",
    backgroundColor: theme.colors.neutral.black,
    borderRadius: 32,
    zIndex: 0,
  },
}));

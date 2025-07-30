import type { PropsWithChildren } from "react";
import { memo } from "react";
import { Pressable, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import {
  getStyleKeyByState,
  getStyleValueByState,
} from "../../helpers/styleGettersByState";
import { Spacer } from "../Spacer/Spacer";
import { Typography } from "../Typography/Typography";
import { StyleSheet, useUnistyles } from "react-native-unistyles";
import { Icon } from "../../icons/Icon";

type AccordionProps = PropsWithChildren & {
  title: string;
  disabled?: boolean;
  isOpen: boolean;
  onPress: () => void;
};

const getAccordionStyleState = (disabled: boolean) => {
  return disabled ? "disabled" : undefined;
};

const CHEVRON_UP_ROTATION = 180;
const CHEVRON_DOWN_ROTATION = 0;

export const Accordion = memo(
  ({ title, disabled = false, isOpen, onPress, children }: AccordionProps) => {
    const { theme } = useUnistyles();

    const handlePress = () => onPress();

    return (
      <View style={styles.container({ disabled })}>
        <Pressable
          style={styles.header}
          disabled={disabled}
          onPress={handlePress}
        >
          <Typography
            variant="Title.H3"
            color={getStyleKeyByState(
              theme,
              "components.radio-button",
              getAccordionStyleState(disabled),
              "text-color",
            )}
          >
            {title}
          </Typography>
          <AnimatedChevronIcon isOpen={isOpen} />
        </Pressable>
        <Content isOpen={isOpen}>{children}</Content>
      </View>
    );
  },
);
Accordion.displayName = "Accordion";

const Content = memo(
  ({ isOpen, children }: Pick<AccordionProps, "isOpen" | "children">) => {
    const { theme } = useUnistyles();

    const height = useSharedValue(0);

    const derivedHeight = useDerivedValue(() =>
      withSpring(height.value * Number(isOpen), {
        duration: 800,
        dampingRatio: 0.7,
      }),
    );

    const bodyStyle = useAnimatedStyle(() => ({
      overflow: "hidden",
      height: derivedHeight.value,
    }));

    return (
      <Animated.View style={bodyStyle}>
        <View
          style={styles.contentContainer}
          onLayout={(e) => {
            height.value = e.nativeEvent.layout.height;
          }}
        >
          <Spacer vertical={theme.components.accordion.gap} />
          {children}
        </View>
      </Animated.View>
    );
  },
);
Content.displayName = "Content";

const AnimatedChevronIcon = memo(({ isOpen }: { isOpen: boolean }) => {
  const { theme } = useUnistyles();

  const rotation = useSharedValue(0);

  useDerivedValue(() => {
    rotation.value = withTiming(
      isOpen ? CHEVRON_UP_ROTATION : CHEVRON_DOWN_ROTATION,
      { duration: 250 },
    );
  }, [isOpen]);

  const style = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  return (
    <Animated.View style={style}>
      <Icon
        icon="ChevronDown"
        color="components.accordion.content-color"
        size={theme.components["icon-size-M"]}
      />
    </Animated.View>
  );
});
AnimatedChevronIcon.displayName = "AnimatedChevronIcon";

const styles = StyleSheet.create(({ components }) => ({
  container: ({ disabled }) => {
    const borderWidth = components.accordion["border-size"];
    return {
      paddingVertical: components.accordion["vertical-padding"] - borderWidth,
      paddingHorizontal:
        components.accordion["horizontal-padding"] - borderWidth,
      borderRadius: components.accordion["corner-radius"],
      borderWidth,
      minHeight: components.accordion["height"],
      borderColor: getStyleValueByState(
        components.accordion,
        getAccordionStyleState(disabled),
        "border-color",
      ),
      backgroundColor: getStyleValueByState(
        components.accordion,
        getAccordionStyleState(disabled),
        "background-color",
      ),
    };
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    minHeight: components.accordion["header-min-height"],
  },
  contentContainer: {
    position: "absolute",
  },
}));

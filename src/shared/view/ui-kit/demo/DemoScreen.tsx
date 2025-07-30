import { AccordionDemo } from "../components/Accordion/Accordion.demo";
import { CustomScrollView } from "../../components/CustomScrollView";
import { ButtonDemo } from "../components/Button/Button.demo";
import { TagDemo } from "../components/Tag/Tag.demo";
import { TypographyDemo } from "../components/Typography/Typography.demo";
import { StyleSheet } from "react-native-unistyles";
import { ScreenTemplate } from "../../components/ScreenTemplate";

export const UIKitDemoScreen = () => {
  return (
    <ScreenTemplate>
      <CustomScrollView style={styles.container}>
        <AccordionDemo />
        <ButtonDemo />
        <TagDemo />
        <TypographyDemo />
      </CustomScrollView>
    </ScreenTemplate>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});

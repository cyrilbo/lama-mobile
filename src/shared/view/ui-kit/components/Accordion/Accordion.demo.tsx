import { useState } from "react";

import { Accordion } from "./Accordion";
import { Typography } from "../Typography/Typography";
import { DemoSection } from "../../demo/DemoSection";
import { View } from "react-native";
import { StyleSheet } from "react-native-unistyles";

export const AccordionDemo = () => {
  const [isAccordion1Open, setIsAccordion1Open] = useState(false);
  const [isAccordion2Open, setIsAccordion2Open] = useState(false);

  return (
    <View style={styles.container}>
      <DemoSection title="Accordion" />
      <Accordion
        title="Accordion title"
        isOpen={isAccordion1Open}
        onPress={() => setIsAccordion1Open((prev) => !prev)}
      >
        <Typography
          variant="Text.P1.Paragraph"
          color="components.accordion.content-color"
        >
          {
            "Content: Lorem ipsum dolor sit amet consectetur. Mauris accumsan nullam integer suscipit volutpat suspendisse imperdiet. Placerat mattis et non turpis est dictumst ut."
          }
        </Typography>
      </Accordion>
      <Accordion
        title="Accordion title"
        isOpen={isAccordion2Open}
        disabled
        onPress={() => setIsAccordion2Open((prev) => !prev)}
      >
        <Typography
          variant="Text.P1.Paragraph"
          color="components.accordion.content-color"
        >
          {
            "Content: Lorem ipsum dolor sit amet consectetur. Mauris accumsan nullam integer suscipit volutpat suspendisse imperdiet. Placerat mattis et non turpis est dictumst ut."
          }
        </Typography>
      </Accordion>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 16,
  },
});

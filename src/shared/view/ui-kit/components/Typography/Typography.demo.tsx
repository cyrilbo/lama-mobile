import React from "react";
import { DemoSection } from "../../demo/DemoSection";
import { Typography } from "./Typography";
import { StyleSheet } from "react-native-unistyles";
import { View } from "react-native";

export const TypographyDemo = () => {
  return (
    <View style={styles.container}>
      <DemoSection title="Typography" />
      <Typography variant="Tagline.L">TagLine L</Typography>
      <Typography variant="Tagline.M">TagLine M</Typography>
      <Typography variant="Title.H1">Title H1</Typography>
      <Typography variant="Title.H2">Title H2</Typography>
      <Typography variant="Title.H3">Title H3</Typography>
      <Typography variant="Title.H4">Title H4</Typography>
      <Typography variant="Text.P1.Label">Text P1 Label</Typography>
      <Typography variant="Text.P1.Paragraph">Text P1 Paragraph</Typography>
      <Typography variant="Text.P1.Important">Text P1 Important</Typography>
      <Typography variant="Text.P1.Specified">Text P1 Specified</Typography>
      <Typography variant="Text.P2.Label">Text P2 Label</Typography>
      <Typography variant="Text.P2.Paragraph">Text P2 Paragraph</Typography>
      <Typography variant="Text.P2.Important">Text P2 Important</Typography>
      <Typography variant="Text.P2.Specified">Text P2 Specified</Typography>
      <Typography variant="Text.Caption.Label">Text Caption Label</Typography>
      <Typography variant="Text.Caption.Paragraph">
        Text Caption Paragraph
      </Typography>
      <Typography variant="Text.Caption.Important">
        Text Caption Important
      </Typography>
      <Typography variant="Text.Caption.Specified">
        Text Caption Specified
      </Typography>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 16,
  },
});

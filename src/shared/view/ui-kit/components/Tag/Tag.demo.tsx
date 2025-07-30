import { Tag } from "./Tag";
import { DemoSection } from "../../demo/DemoSection";
import { View } from "react-native";
import { StyleSheet } from "react-native-unistyles";

export const TagDemo = () => {
  return (
    <View style={styles.container}>
      <DemoSection title="Tag" />
      <Tag label="Label loooong" leftIcon={"User"} onPressCross={() => {}} />
      <Tag level="secondary" label="Label" leftIcon={"User"} />
      <Tag level="success" label="Succès" leftIcon={"CircleCheck"} />
      <Tag level="warning" label="Alerte !" leftIcon={"TriangleAlert"} />
      <Tag level="error" label="Erreur" leftIcon={"CircleX"} />
      <Tag disabled label="Désactivé" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 16,
  },
});

import { Button } from "./Button";
import { DemoSection } from "../../demo/DemoSection";
import { StyleSheet } from "react-native-unistyles";
import { View } from "react-native";

export const ButtonDemo = () => {
  return (
    <View style={styles.container}>
      <DemoSection title="Button" />
      <Button
        label="XS primary"
        size="XS"
        leftIcon="ArrowLeft"
        rightIcon="ArrowRight"
      />
      <Button
        isLoading
        label="XS primary"
        size="XS"
        leftIcon="ArrowLeft"
        rightIcon="ArrowRight"
      />
      <Button label="S primary" leftIcon="ArrowLeft" rightIcon="ArrowRight" />
      <Button
        label="M primary "
        size="M"
        leftIcon="ArrowLeft"
        rightIcon="ArrowRight"
      />
      <Button
        label="L primary "
        size="L"
        leftIcon="ArrowLeft"
        rightIcon="ArrowRight"
      />
      <Button
        isLoading
        label="L primary "
        size="L"
        leftIcon="ArrowLeft"
        rightIcon="ArrowRight"
      />
      <Button
        label="M primary disabled"
        disabled
        leftIcon="ArrowLeft"
        rightIcon="ArrowRight"
      />
      <Button
        label="XS secondary"
        size="XS"
        variant="secondary"
        leftIcon="ArrowLeft"
        rightIcon="ArrowRight"
      />
      <Button
        label="XS secondary"
        size="XS"
        variant="secondary"
        leftIcon="ArrowLeft"
        rightIcon="ArrowRight"
      />
      <Button
        label="S secondary"
        variant="secondary"
        leftIcon="ArrowLeft"
        rightIcon="ArrowRight"
      />
      <Button
        label="M secondary"
        size="M"
        variant="secondary"
        leftIcon="ArrowLeft"
        rightIcon="ArrowRight"
      />
      <Button
        label="L secondary"
        size="L"
        variant="secondary"
        leftIcon="ArrowLeft"
        rightIcon="ArrowRight"
      />
      <Button
        isLoading
        label="L secondary"
        size="L"
        variant="secondary"
        leftIcon="ArrowLeft"
        rightIcon="ArrowRight"
      />
      <Button
        label="S secondary disabled"
        disabled
        variant="secondary"
        leftIcon="ArrowLeft"
        rightIcon="ArrowRight"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 16,
  },
});

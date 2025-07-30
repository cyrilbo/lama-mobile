import "@/src/shared/view/ui-kit/theme/unistyles";

import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { queryClient } from "@/src/shared/infra/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { I18nProvider } from "../i18n/I18n.provider";

export default function RootLayout() {
  const [loaded] = useFonts({
    ["Vesterbro"]: require("../../../assets/fonts/Vesterbro-Extrabold-Latin.ttf"),
    ["Inter"]: require("../../../assets/fonts/Inter.ttf"),
    ["Inter-Italic"]: require("../../../assets/fonts/Inter-Italic.ttf"),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <I18nProvider>
      <QueryClientProvider client={queryClient}>
        <Stack screenOptions={{ headerShown: false }} />
        <StatusBar style="dark" />
      </QueryClientProvider>
    </I18nProvider>
  );
}

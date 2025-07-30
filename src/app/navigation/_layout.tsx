import "@/src/shared/view/ui-kit/theme/unistyles";

import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { queryClient } from "@/src/shared/infra/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";

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
    <QueryClientProvider client={queryClient}>
      <Stack screenOptions={{ headerShown: false }} />
      <StatusBar style="dark" />
    </QueryClientProvider>
  );
}

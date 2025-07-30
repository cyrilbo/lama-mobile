import { queryClient } from "@/shared/infra/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import type { RenderOptions } from "@testing-library/react-native";
import { render } from "@testing-library/react-native";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

// Using iPhone 13 metrics for tests
const safeAreaInitialMetrics = {
  frame: { x: 0, y: 0, width: 390, height: 844 },
  insets: { top: 47, left: 0, right: 0, bottom: 34 },
};

afterEach(() => {
  queryClient.clear();
});

export const renderWithProviders = (
  element: React.ReactElement,
  options?: RenderOptions,
) => {
  return render(element, {
    wrapper: ({ children }) => (
      <QueryClientProvider client={queryClient}>
        <SafeAreaProvider initialMetrics={safeAreaInitialMetrics}>
          {children}
        </SafeAreaProvider>
      </QueryClientProvider>
    ),
    ...options,
  });
};

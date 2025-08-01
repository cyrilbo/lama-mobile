import { queryClient } from "@/src/shared/infra/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import type { RenderOptions } from "@testing-library/react-native";
import { render } from "@testing-library/react-native";
import React, { act } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { I18nProvider } from "../app/i18n/I18n.provider";
import {
  MockContextConfig,
  renderRouter,
  RenderRouterOptions,
} from "expo-router/testing-library";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

// Using iPhone 13 metrics for tests
const safeAreaInitialMetrics = {
  frame: { x: 0, y: 0, width: 390, height: 844 },
  insets: { top: 47, left: 0, right: 0, bottom: 34 },
};

afterEach(() => {
  queryClient.clear();
});

export const renderWithProviders = async (
  component: React.ReactElement,
  options?: RenderOptions,
) => {
  const renderComp = () => renderWithProvidersBase(component, options);

  const result = await act(renderComp);

  return result;
};

const renderWithProvidersBase = (
  element: React.ReactElement,
  options?: RenderOptions,
) => {
  return render(element, {
    wrapper: ({ children }) => (
      <BottomSheetModalProvider>
        <I18nProvider>
          <QueryClientProvider client={queryClient}>
            <SafeAreaProvider initialMetrics={safeAreaInitialMetrics}>
              {children}
            </SafeAreaProvider>
          </QueryClientProvider>
        </I18nProvider>
      </BottomSheetModalProvider>
    ),
    ...options,
  });
};

export const renderRouterWithProviders = async (
  context: MockContextConfig,
  options?: RenderRouterOptions,
) => {
  const renderComp = () => renderRouterWithProvidersBase(context, options);

  const result = await act(renderComp);

  return result;
};

const renderRouterWithProvidersBase = (
  context: MockContextConfig,
  options?: RenderRouterOptions,
) => {
  return renderRouter(context, {
    wrapper: ({ children }) => (
      <BottomSheetModalProvider>
        <I18nProvider>
          <QueryClientProvider client={queryClient}>
            <SafeAreaProvider initialMetrics={safeAreaInitialMetrics}>
              {children}
            </SafeAreaProvider>
          </QueryClientProvider>
        </I18nProvider>
      </BottomSheetModalProvider>
    ),
    ...options,
  });
};

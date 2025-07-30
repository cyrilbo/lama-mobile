import type { DefaultOptions } from "@tanstack/react-query";
import { focusManager, QueryClient } from "@tanstack/react-query";
import { AppState } from "react-native";

const createQueryClient = () => {
  const queryClient = new QueryClient({ defaultOptions });

  return queryClient;
};

AppState.addEventListener("change", (nextAppState) => {
  // This is used with the `refetchOnWindowFocus` option
  focusManager.setFocused(nextAppState === "active");
});

// Required reading when choosing options: https://react-query.tanstack.com/guides/important-defaults

const ONE_MINUTE_IN_MS = 1000 * 60;
const ONE_HOUR_IN_MS = ONE_MINUTE_IN_MS * 60;
const ONE_DAY_IN_MS = ONE_HOUR_IN_MS * 24;

const defaultOptions: DefaultOptions = {
  queries: {
    staleTime: 5 * ONE_MINUTE_IN_MS,
    refetchOnWindowFocus: true, // This works with the event listener above
    refetchOnReconnect: false, // This doesn't work by default with React Native.
    refetchOnMount: true, // Data will get refetched (with previous data still available) on mount if it's stale
    retryOnMount: true, // Data will get refetched (with hard-loading state) on mount if it errored the last time
    retry: false, // Without this, queries that error would be retried 3 times automatically
    gcTime:
      process.env.NODE_ENV === "test"
        ? Infinity // Infinite gcTime in tests https://tanstack.com/query/latest/docs/framework/react/guides/testing#set-gctime-to-infinity-with-jest
        : 1 * ONE_DAY_IN_MS,
  },
  mutations: {
    retry: false, // Without this, mutations that error would be retried 3 times automatically
  },
};

export const queryClient = createQueryClient();

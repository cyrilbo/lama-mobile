import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { getPaymentsConnector } from "./getPayments.connector";

export const getPaymentsQueryKey = () => ["payments"];

const paymentsQueryOptions = queryOptions({
  queryKey: getPaymentsQueryKey(),
  queryFn: () => getPaymentsConnector(),
});

export const useGetPayments = () => {
  return useSuspenseQuery(paymentsQueryOptions);
};

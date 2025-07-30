import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { getPaymentDetailsConnector } from "./getPaymentDetails.connector";

export const getPaymentDetailsQueryKey = (paymentId: string) => [
  "payments",
  paymentId,
];

const paymentsQueryOptions = (paymentId: string) =>
  queryOptions({
    queryKey: getPaymentDetailsQueryKey(paymentId),
    queryFn: () => getPaymentDetailsConnector(paymentId),
  });

export const useGetPaymentDetails = (paymentId: string) => {
  return useSuspenseQuery(paymentsQueryOptions(paymentId));
};

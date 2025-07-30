import { httpClient } from "@/src/shared/infra/httpClient";
import { getPaymentsResponseSchema } from "./getPayments.types";

export const getPaymentsConnector = async () => {
  const response = await httpClient.get("/payments");
  return getPaymentsResponseSchema.parse(response.data);
};

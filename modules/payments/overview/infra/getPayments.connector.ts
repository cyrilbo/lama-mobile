import { httpClient } from "@/shared/infra/httpClient";
import { getPaymentsResponseSchema } from "./getPayments.types";

export const getPaymentsConnector = async () => {
  const response = await httpClient.get("/payments");
  return getPaymentsResponseSchema.parse(response.data);
};

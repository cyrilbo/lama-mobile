import { httpClient } from "@/src/shared/infra/httpClient";
import { getPaymentDetailsResponseSchema } from "./getPaymentDetails.types";

export const getPaymentDetailsConnector = async (paymentId: string) => {
  const response = await httpClient.get(`/payment/${paymentId}`);
  return getPaymentDetailsResponseSchema.parse(response.data);
};

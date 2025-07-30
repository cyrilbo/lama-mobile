import { z } from "zod";
import { detailedPaymentSchema } from "../../shared/domain/payment.types";

export const getPaymentDetailsResponseSchema = detailedPaymentSchema;

export type GetPaymentDetailsResponse = z.infer<
  typeof getPaymentDetailsResponseSchema
>;

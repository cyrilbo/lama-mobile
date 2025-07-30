import { z } from "zod";
import { amountSchema, paymentSchema } from "../../shared/domain/payment.types";

export const getPaymentsResponseSchema = z.object({
  total_amount_left_to_pay: amountSchema,
  payments: z.array(paymentSchema),
});

export type GetPaymentsResponse = z.infer<typeof getPaymentsResponseSchema>;

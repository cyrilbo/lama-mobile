import { z } from "zod";

export const amountSchema = z.number().int().min(0);

export const timestampSchema = z.number().int().positive();

export const isoDateStringSchema = z.iso.date();

export const paymentPlanSchema = z.object({
  id: z.string(),
  purchase_amount: amountSchema,
  original_purchase_amount: amountSchema.nullable(),
  due_date: timestampSchema,
  original_due_date: timestampSchema.nullable(),
  date_paid: timestampSchema.nullable(),
  state: z.enum(["pending", "paid"]),
  customer_fee: amountSchema,
  customer_interest: amountSchema,
  customer_can_postpone_until: isoDateStringSchema.nullable(),
  customer_cannot_postpone_reason: z.unknown(),
});

export type PaymentPlan = z.infer<typeof paymentPlanSchema>;

export const paymentSchema = z.object({
  id: z.string(),
  created: timestampSchema,
  state: z.enum(["in_progress"]),
  installments_count: z.number().int().positive(),
  merchant_display_name: z.string(),
  purchase_amount: amountSchema,
  payment_plan: z.array(paymentPlanSchema),
  recovery: z.any(),
  deferred_trigger: z.boolean(),
  deferred_trigger_applied: z.unknown(),
  deferred_trigger_description: z.unknown(),
  is_deferred_capture: z.boolean(),
  logo_url: z.url().nullable(),
  refunds: z.unknown(),
});

export type Payment = z.infer<typeof paymentSchema>;

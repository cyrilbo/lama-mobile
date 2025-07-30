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

const PaymentFeesSchema = z.object({
  customer: z.object({
    total: amountSchema,
    total_excluding_tax: amountSchema,
    tax: amountSchema,
  }),
});

const cardSchema = z.object({
  id: z.string(),
  brand: z.enum(["visa"]),
  iin: z.string(),
  country: z.enum(["FR"]),
  created: timestampSchema,
  exp_month: z.number().int().min(1).max(12),
  exp_year: z.number().int().min(0),
  last4: z.string().length(4),
  verified: z.boolean(),
  psp: z.string(),
  psp_representations: z.unknown(),
});

const customerSchema = z.object({
  id: z.string(),
  card: cardSchema,
  cards: z.array(cardSchema),
  payment_methods: z.unknown(),
});

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

export const detailedPaymentSchema = paymentSchema.extend({
  locale: z.enum(["fr"]),
  country_of_service: z.enum(["FR"]),
  fees: PaymentFeesSchema,
  customer_interest: amountSchema,
  annual_interest_rate: z.unknown(),
  deferred_days: z.number().int().min(0),
  deferred_months: z.number().int().min(0),
  merchant_id: z.string(),
  merchant_brand: z.string(),
  merchant_display_name: z.string(),
  merchant_name: z.string(),
  merchant_website: z.string().nullable(),
  merchant_email: z.array(z.email()),
  merchant_phone: z.string().nullable(),
  customer: customerSchema,
  requirements: z.unknown(),
  prefered_payment_method: z.unknown(),
  orders: z.unknown(),
  return_url: z.url().nullable(),
  checkout_ab_tests: z.unknown(),
});

export type DetailedPayment = z.infer<typeof detailedPaymentSchema>;

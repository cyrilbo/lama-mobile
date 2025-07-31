import { z } from "zod";

export const amountSchema = z.number().int().min(0).brand("amount");

export type Amount = z.infer<typeof amountSchema>;

export const timestampSchema = z.number().int().positive().brand("timestamp");

export type Timestamp = z.infer<typeof timestampSchema>;

export const isoDateStringSchema = z.iso.date().brand("isoDateString");

export type IsoDateString = z.infer<typeof isoDateStringSchema>;

export const paymentPlanSchema = z.array(
  z.object({
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
  }),
);

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
});

export type Card = z.infer<typeof cardSchema>;

const customerSchema = z.object({
  id: z.string(),
  card: cardSchema,
  cards: z.array(cardSchema),
});

export const paymentStateSchema = z.enum(["in_progress", "completed"]);

export type PaymentState = z.infer<typeof paymentStateSchema>;

export const paymentSchema = z.object({
  id: z.string(),
  created: timestampSchema,
  state: paymentStateSchema,
  installments_count: z.number().int().positive(),
  merchant_display_name: z.string(),
  purchase_amount: amountSchema,
  payment_plan: paymentPlanSchema,
  logo_url: z.url().nullable(),
});

export type Payment = z.infer<typeof paymentSchema>;

export const detailedPaymentSchema = paymentSchema.extend({
  locale: z.enum(["fr"]),
  country_of_service: z.enum(["FR"]),
  fees: PaymentFeesSchema,
  customer_interest: amountSchema,
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
  return_url: z.url().nullable(),
});

export type DetailedPayment = z.infer<typeof detailedPaymentSchema>;

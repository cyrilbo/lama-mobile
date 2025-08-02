import { deepMerge } from "@/src/shared/helpers/deepMerge";
import { DeepPartial } from "@/src/shared/helpers/deepPartial.types";
import {
  Amount,
  Installment,
  IsoDateString,
  Payment,
  Timestamp,
} from "./payment.types";

const installmentFixture: Installment = {
  id: "installment_121IopV7jNAHBV9kfHX66XiKbH88Z7K6Vh",
  purchase_amount: 5250 as Amount,
  original_purchase_amount: 5250 as Amount,
  due_date: 1751527297 as Timestamp,
  original_due_date: null,
  date_paid: 1751527335 as Timestamp,
  state: "paid",
  customer_fee: 378 as Amount,
  customer_interest: 0 as Amount,
  customer_can_postpone_until: null,
};

export const getInstallmentFixture = (
  params?: DeepPartial<Installment>,
): Installment => deepMerge(installmentFixture, params);

const paymentFixture: Payment = {
  id: "payment_121IopV7OU4kX5pMradVJfGAQzSJz7MGy2",
  created: 1751527297 as Timestamp,
  state: "in_progress",
  installments_count: 4,
  merchant_display_name: "France_merchant",
  purchase_amount: 21000 as Amount,
  payment_plan: [
    {
      id: "installment_121IopV7jNAHBV9kfHX66XiKbH88Z7K6Vh",
      purchase_amount: 5250 as Amount,
      original_purchase_amount: 5250 as Amount,
      due_date: 1751527297 as Timestamp,
      original_due_date: null,
      date_paid: 1751527335 as Timestamp,
      state: "paid",
      customer_fee: 378 as Amount,
      customer_interest: 0 as Amount,
      customer_can_postpone_until: null,
    },
    {
      id: "installment_121IopV5UspdWks53KZ1P5zTRRKG51sP9m",
      purchase_amount: 5250 as Amount,
      original_purchase_amount: 5250 as Amount,
      due_date: 1754205697 as Timestamp,
      original_due_date: null,
      date_paid: null,
      state: "pending",
      customer_fee: 0 as Amount,
      customer_interest: 0 as Amount,
      customer_can_postpone_until: "2025-09-03" as IsoDateString,
    },
    {
      id: "installment_121IopV6yEGwrRoMhkooKdJZONFD36bgPX",
      purchase_amount: 5250 as Amount,
      original_purchase_amount: 5250 as Amount,
      due_date: 1756884097 as Timestamp,
      original_due_date: null,
      date_paid: null,
      state: "pending",
      customer_fee: 0 as Amount,
      customer_interest: 0 as Amount,
      customer_can_postpone_until: "2025-10-03" as IsoDateString,
    },
    {
      id: "installment_121IopV5S0nF0Gc4IqzCSxfy1xBsG6B1tL",
      purchase_amount: 5250 as Amount,
      original_purchase_amount: 5250 as Amount,
      due_date: 1759476097 as Timestamp,
      original_due_date: null,
      date_paid: null,
      state: "pending",
      customer_fee: 0 as Amount,
      customer_interest: 0 as Amount,
      customer_can_postpone_until: "2025-11-03" as IsoDateString,
    },
  ],
  logo_url: null,
};

export const getPaymentFixture = (params?: DeepPartial<Payment>): Payment =>
  deepMerge(paymentFixture, params);

import { Amount, Payment, PaymentPlan } from "./payment.types";

export const computeAlreadyPaidAmount = (paymentPlan: PaymentPlan): Amount => {
  return paymentPlan
    .filter((plan) => plan.state === "paid")
    .reduce((acc, plan) => (acc + plan.purchase_amount) as Amount, 0 as Amount);
};

export const computeRemainingAmountToPay = (payment: Payment): Amount => {
  return (payment.purchase_amount -
    computeAlreadyPaidAmount(payment.payment_plan)) as Amount;
};

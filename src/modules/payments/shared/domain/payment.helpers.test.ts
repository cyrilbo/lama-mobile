import { Amount, Timestamp } from "./payment.types";
import {
  computeAlreadyPaidAmount,
  computeRemainingAmountToPay,
  getNextInstallment,
} from "./payment.helpers";
import { getPaymentFixture, getInstallmentFixture } from "./payment.fixtures";

describe("payment.helpers", () => {
  describe("computeAlreadyPaidAmount", () => {
    it("returns 0 when payment plan is empty", () => {
      const result = computeAlreadyPaidAmount([]);
      expect(result).toBe(0);
    });

    it("returns 0 when no installments are paid", () => {
      const paymentPlan = [
        getInstallmentFixture({
          state: "pending",
          purchase_amount: 1000 as Amount,
        }),
        getInstallmentFixture({
          state: "pending",
          purchase_amount: 2000 as Amount,
        }),
      ];

      const result = computeAlreadyPaidAmount(paymentPlan);
      expect(result).toBe(0);
    });

    it("returns sum of only paid installments when mixed with pending", () => {
      const paymentPlan = [
        getInstallmentFixture({
          state: "paid",
          purchase_amount: 1000 as Amount,
        }),
        getInstallmentFixture({
          state: "pending",
          purchase_amount: 2000 as Amount,
        }),
        getInstallmentFixture({
          state: "paid",
          purchase_amount: 1500 as Amount,
        }),
        getInstallmentFixture({
          state: "pending",
          purchase_amount: 3000 as Amount,
        }),
      ];

      const result = computeAlreadyPaidAmount(paymentPlan);
      expect(result).toBe(2500);
    });
  });

  describe("computeRemainingAmountToPay", () => {
    it("returns full amount when no installments are paid", () => {
      const payment = getPaymentFixture({
        purchase_amount: 10000 as Amount,
        payment_plan: [
          getInstallmentFixture({
            state: "pending",
            purchase_amount: 5000 as Amount,
          }),
          getInstallmentFixture({
            state: "pending",
            purchase_amount: 5000 as Amount,
          }),
        ],
      });

      const result = computeRemainingAmountToPay(payment);
      expect(result).toBe(10000);
    });

    it("returns 0 when all installments are paid", () => {
      const payment = getPaymentFixture({
        purchase_amount: 10000 as Amount,
        payment_plan: [
          getInstallmentFixture({
            state: "paid",
            purchase_amount: 6000 as Amount,
          }),
          getInstallmentFixture({
            state: "paid",
            purchase_amount: 4000 as Amount,
          }),
        ],
      });

      const result = computeRemainingAmountToPay(payment);
      expect(result).toBe(0);
    });

    it("returns remaining amount when some installments are paid", () => {
      const payment = getPaymentFixture({
        purchase_amount: 10000 as Amount,
        payment_plan: [
          getInstallmentFixture({
            state: "paid",
            purchase_amount: 3000 as Amount,
          }),
          getInstallmentFixture({
            state: "pending",
            purchase_amount: 4000 as Amount,
          }),
          getInstallmentFixture({
            state: "pending",
            purchase_amount: 3000 as Amount,
          }),
        ],
      });

      const result = computeRemainingAmountToPay(payment);
      expect(result).toBe(7000);
    });
  });

  describe("getNextInstallment", () => {
    it("returns null when payment plan is empty", () => {
      const payment = getPaymentFixture({ payment_plan: [] });
      const result = getNextInstallment(payment);
      expect(result).toBeNull();
    });

    it("returns null when no pending installments exist", () => {
      const payment = getPaymentFixture({
        payment_plan: [
          getInstallmentFixture({ state: "paid" }),
          getInstallmentFixture({ state: "paid" }),
        ],
      });

      const result = getNextInstallment(payment);
      expect(result).toBeNull();
    });

    it("returns the only pending installment", () => {
      const pendingInstallment = getInstallmentFixture({
        id: "pending-1",
        state: "pending",
        due_date: 1754205697 as Timestamp,
      });

      const payment = getPaymentFixture({
        payment_plan: [
          getInstallmentFixture({ state: "paid" }),
          pendingInstallment,
        ],
      });

      const result = getNextInstallment(payment);
      expect(result).toEqual(pendingInstallment);
    });

    it("returns the earliest pending installment when multiple exist", () => {
      const earliestInstallment = getInstallmentFixture({
        id: "earliest",
        state: "pending",
        due_date: 1600000000 as Timestamp,
      });

      const laterInstallment = getInstallmentFixture({
        id: "later",
        state: "pending",
        due_date: 1700000000 as Timestamp,
      });

      const payment = getPaymentFixture({
        payment_plan: [
          getInstallmentFixture({ state: "paid" }),
          laterInstallment,
          earliestInstallment,
        ],
      });

      const result = getNextInstallment(payment);
      expect(result).toEqual(earliestInstallment);
    });
  });
});

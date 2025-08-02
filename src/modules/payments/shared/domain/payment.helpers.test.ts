import { Amount } from "./payment.types";
import {
  computeAlreadyPaidAmount,
  computeRemainingAmountToPay,
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
});

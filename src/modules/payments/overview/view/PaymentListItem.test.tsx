import React from "react";
import { screen } from "@testing-library/react-native";
import { renderWithProviders } from "@/src/testing/render";
import { PaymentListItem } from "./PaymentListItem";
import {
  getInstallmentFixture,
  getPaymentFixture,
} from "../../shared/domain/payment.fixtures";

describe("PaymentListItem", () => {
  it("renders payment information correctly", async () => {
    const payment = getPaymentFixture();
    await renderWithProviders(<PaymentListItem payment={payment} />);

    expect(screen.getByText("07/03/2025")).toBeOnTheScreen();
    expect(screen.getByText("France_merchant")).toBeOnTheScreen();
    expect(screen.getByText("€210.00")).toBeOnTheScreen();
    expect(screen.getByText("€157.50")).toBeOnTheScreen();
    expect(screen.getByText("Next installment")).toBeOnTheScreen();
    expect(screen.getByText("08/03/2025")).toBeOnTheScreen();
    expect(screen.getByText("€52.50")).toBeOnTheScreen();
  });

  it("does not render next installment if all installments are paid", async () => {
    const paidInstallment = getInstallmentFixture({
      state: "paid",
    });
    const payment = getPaymentFixture({
      payment_plan: [paidInstallment],
    });

    await renderWithProviders(<PaymentListItem payment={payment} />);

    expect(screen.queryByText("Next installment")).not.toBeOnTheScreen();
  });
});

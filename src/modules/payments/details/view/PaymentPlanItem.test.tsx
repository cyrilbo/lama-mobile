import { screen } from "@testing-library/react-native";
import React from "react";
import {
  getCustomerFixture,
  getInstallmentFixture,
} from "../../shared/domain/payment.fixtures";
import { PaymentPlanTimelineItem } from "./PaymentPlanItem";
import { renderWithProviders } from "@/src/testing/render";

describe("PaymentPlanItem", () => {
  it("renders a pending installment correctly", async () => {
    const pendingInstallment = getInstallmentFixture({
      state: "pending",
      date_paid: null,
    });
    const customer = getCustomerFixture();

    await renderWithProviders(
      <PaymentPlanTimelineItem
        installment={pendingInstallment}
        customer={customer}
        index={0}
        totalInstallments={1}
      />,
    );

    expect(await screen.findByText("07/03/2025")).toBeOnTheScreen();
    expect(await screen.findByText("€52.50")).toBeOnTheScreen();
    expect(await screen.findByTestId("Hourglass-icon")).toBeOnTheScreen();
    expect(
      screen.queryByText("Paid at", { exact: false }),
    ).not.toBeOnTheScreen();
  });

  it("renders a paid installment correctly", async () => {
    const customer = getCustomerFixture();
    const paidInstallment = getInstallmentFixture();
    await renderWithProviders(
      <PaymentPlanTimelineItem
        installment={paidInstallment}
        customer={customer}
        index={0}
        totalInstallments={1}
      />,
    );
    expect(await screen.findByText("07/03/2025")).toBeOnTheScreen();
    expect(await screen.findByText("€52.50")).toBeOnTheScreen();
    expect(await screen.findByTestId("CheckCircle-icon")).toBeOnTheScreen();
    expect(await screen.findByText("Paid at 07/03/2025")).toBeOnTheScreen();
  });
});

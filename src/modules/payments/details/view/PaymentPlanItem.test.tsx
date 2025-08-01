import { screen } from "@testing-library/react-native";
import React from "react";
import { getInstallmentFixture } from "../../shared/domain/payment.fixtures";
import { PaymentPlanTimelineItem } from "./PaymentPlanItem";
import { renderWithProviders } from "@/src/testing/render";

describe("PaymentPlanItem", () => {
  it("renders a pending installment correctly", async () => {
    const pendingInstallment = getInstallmentFixture({
      state: "pending",
      date_paid: null,
    });
    await renderWithProviders(
      <PaymentPlanTimelineItem
        installment={pendingInstallment}
        isLast={false}
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
    const paidInstallment = getInstallmentFixture();
    await renderWithProviders(
      <PaymentPlanTimelineItem installment={paidInstallment} isLast={false} />,
    );
    expect(await screen.findByText("07/03/2025")).toBeOnTheScreen();
    expect(await screen.findByText("€52.50")).toBeOnTheScreen();
    expect(await screen.findByTestId("CheckCircle-icon")).toBeOnTheScreen();
    expect(await screen.findByText("Paid at 07/03/2025")).toBeOnTheScreen();
  });
});

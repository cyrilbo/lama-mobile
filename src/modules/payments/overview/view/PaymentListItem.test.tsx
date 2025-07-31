import React from "react";
import { screen } from "@testing-library/react-native";
import { renderWithProviders } from "@/src/testing/render";
import { PaymentListItem } from "./PaymentListItem";
import { getPaymentsFixture } from "../infra/getPayments.fixtures";

describe("PaymentListItem", () => {
  it("renders payment information correctly", async () => {
    await renderWithProviders(
      <PaymentListItem payment={getPaymentsFixture.payments[0]!} />,
    );

    expect(screen.getByText("07/03/2025")).toBeOnTheScreen();
    expect(screen.getByText("France_merchant")).toBeOnTheScreen();
    expect(screen.getByText("€210.00")).toBeOnTheScreen();
    expect(screen.getByText("€157.50")).toBeOnTheScreen();
    expect(screen.getByText("Next installment")).toBeOnTheScreen();
    expect(screen.getByText("08/03/2025")).toBeOnTheScreen();
    expect(screen.getByText("€52.50")).toBeOnTheScreen();
  });
});

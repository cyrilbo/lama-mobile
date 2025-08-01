import { screen } from "@testing-library/react-native";
import { PaymentHeader } from "./PaymentHeader";
import { renderWithProviders } from "@/src/testing/render";
import { detailedPaymentFixture } from "../../shared/domain/payment.fixtures";

describe("PaymentHeader", () => {
  it("renders correctly", async () => {
    await renderWithProviders(
      <PaymentHeader payment={detailedPaymentFixture} />,
    );
    expect(screen.getByText("France_merchant")).toBeOnTheScreen();
    expect(screen.getByText("€210.00")).toBeOnTheScreen();
    expect(screen.getByText("In progress")).toBeOnTheScreen();
  });
});

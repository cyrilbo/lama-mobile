import { screen } from "@testing-library/react-native";
import { PaymentHeader } from "./PaymentHeader";
import { renderWithProviders } from "@/src/testing/render";
import { getPaymentDetailsFixture } from "../infra/getPaymentDetails.fixture";

describe("PaymentHeader", () => {
  it("renders correctly", async () => {
    await renderWithProviders(
      <PaymentHeader payment={getPaymentDetailsFixture} />,
    );
    expect(screen.getByText("France_merchant")).toBeOnTheScreen();
    expect(screen.getByText("€210.00")).toBeOnTheScreen();
    expect(screen.getByText("In progress")).toBeOnTheScreen();
  });
});

import { renderWithProviders } from "@/src/testing/render";
import { mockServer } from "@/src/testing/mockServer";
import { PaymentDetailsScreen } from "../../details/view/PaymentDetailsScreen";
import {
  detailedPaymentFixture,
  getDetailedPaymentFixture,
  getInstallmentFixture,
} from "../../shared/domain/payment.fixtures";
import { screen } from "@testing-library/react-native";

describe("PaymentDetailsScreen", () => {
  it("renders an error page when the request fails", async () => {
    mockServer.get("/payment/payment_121IopV7OU4kX5pMradVJfGAQzSJz7MGy2", {
      response: {
        status: 500,
      },
    });
    await renderWithProviders(
      <PaymentDetailsScreen paymentId="payment_121IopV7OU4kX5pMradVJfGAQzSJz7MGy2" />,
    );
    expect(await screen.findByText("An error occurred")).toBeOnTheScreen();
    expect(await screen.findByText("Retry")).toBeOnTheScreen();
  });
  it("displays the next installment if there is one", async () => {
    mockServer.get(
      "/payment/payment_121IopV7OU4kX5pMradVJfGAQzSJz7MGy2",
      detailedPaymentFixture,
    );

    await renderWithProviders(
      <PaymentDetailsScreen paymentId="payment_121IopV7OU4kX5pMradVJfGAQzSJz7MGy2" />,
    );

    expect(await screen.findByText("Next installment")).toBeOnTheScreen();
  });

  it("does not display the next installment if the payment is completed", async () => {
    const paidInstallment = getInstallmentFixture({
      state: "paid",
    });
    const completedPayment = getDetailedPaymentFixture({
      state: "completed",
      payment_plan: [paidInstallment],
    });

    mockServer.get(
      "/payment/payment_121IopV7OU4kX5pMradVJfGAQzSJz7MGy2",
      completedPayment,
    );

    await renderWithProviders(
      <PaymentDetailsScreen paymentId="payment_121IopV7OU4kX5pMradVJfGAQzSJz7MGy2" />,
    );

    expect(await screen.findByText("Completed")).toBeOnTheScreen();
    expect(screen.queryByText("Next installment")).not.toBeOnTheScreen();
  });
});

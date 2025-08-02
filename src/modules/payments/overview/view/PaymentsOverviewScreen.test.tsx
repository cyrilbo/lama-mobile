import {
  renderRouterWithProviders,
  renderWithProviders,
} from "@/src/testing/render";
import { PaymentsOverviewScreen } from "./PaymentsOverviewScreen";
import { mockServer } from "@/src/testing/mockServer";
import { getPaymentsFixture } from "../infra/getPayments.fixtures";
import { screen, userEvent } from "@testing-library/react-native";
import { screen as routerScreen } from "expo-router/testing-library";
import { PaymentDetailsScreen } from "../../details/view/PaymentDetailsScreen";
import { detailedPaymentFixture } from "../../shared/domain/payment.fixtures";

describe("PaymentsOverviewScreen", () => {
  it("displays the total amount due", async () => {
    mockServer.get("/payments", getPaymentsFixture);

    await renderWithProviders(<PaymentsOverviewScreen />);

    expect(await screen.findByText("Total amount to pay")).toBeOnTheScreen();
    expect(await screen.findByText("€407.50")).toBeOnTheScreen();
  });

  it("can switch between in progress and completed payments", async () => {
    mockServer.get("/payments", getPaymentsFixture);

    await renderWithProviders(<PaymentsOverviewScreen />);

    const inProgressTab = await screen.findByText("In progress");
    const completedTab = await screen.findByText("Completed");
    expect(inProgressTab).toBeOnTheScreen();
    expect(completedTab).toBeOnTheScreen();
    expect(inProgressTab).toBeSelected();
    expect(completedTab).not.toBeSelected();

    expect(screen.getByText("07/03/2025")).toBeOnTheScreen();
    expect(screen.getByText("€210.00")).toBeOnTheScreen();

    await userEvent.press(completedTab);

    expect(inProgressTab).not.toBeSelected();
    expect(completedTab).toBeSelected();
    expect(screen.queryByText("07/03/2025")).not.toBeOnTheScreen();
    expect(screen.queryByText("€210.00")).not.toBeOnTheScreen();
  });

  it("renders an empty state when there are no payments", async () => {
    mockServer.get("/payments", getPaymentsFixture);
    await renderWithProviders(<PaymentsOverviewScreen />);
    await userEvent.press(screen.getByText("Completed"));
    expect(await screen.findByText("No payments found")).toBeOnTheScreen();
  });

  it("navigates to payment details when tapping on a payment", async () => {
    mockServer.get("/payments", getPaymentsFixture);
    mockServer.get(
      "/payment/payment_121IopV7OU4kX5pMradVJfGAQzSJz7MGy2",
      detailedPaymentFixture,
    );

    await renderRouterWithProviders({
      index: PaymentsOverviewScreen,
      "payment/[paymentId]": () => (
        <PaymentDetailsScreen paymentId="payment_121IopV7OU4kX5pMradVJfGAQzSJz7MGy2" />
      ),
    });

    expect(routerScreen).toHavePathname("/");

    await userEvent.press(screen.getByText("07/03/2025"));
    expect(routerScreen).toHavePathname(
      "/payment/payment_121IopV7OU4kX5pMradVJfGAQzSJz7MGy2",
    );
  });
});

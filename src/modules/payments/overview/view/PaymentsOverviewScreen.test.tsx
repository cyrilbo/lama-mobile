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
import { getPaymentDetailsFixture } from "../../details/infra/getPaymentDetails.fixture";

describe("PaymentsOverviewScreen", () => {
  it("should render raw payments", async () => {
    mockServer.get("/payments", getPaymentsFixture);

    await renderWithProviders(<PaymentsOverviewScreen />);

    expect(await screen.findByText("€210.00")).toBeOnTheScreen();
  });

  it("should navigate to payment details", async () => {
    mockServer.get("/payments", getPaymentsFixture);
    mockServer.get(
      "/payment/payment_121IopV7OU4kX5pMradVJfGAQzSJz7MGy2",
      getPaymentDetailsFixture,
    );

    await renderRouterWithProviders({
      index: PaymentsOverviewScreen,
      "payment/[paymentId]": PaymentDetailsScreen,
    });

    expect(routerScreen).toHavePathname("/");

    await userEvent.press(screen.getByText("07/03/2025"));
    expect(routerScreen).toHavePathname(
      "/payment/payment_121IopV7OU4kX5pMradVJfGAQzSJz7MGy2",
    );
  });
});

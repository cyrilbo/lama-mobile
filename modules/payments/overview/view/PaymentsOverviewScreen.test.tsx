import { renderWithProviders } from "@/testing/render";
import { PaymentsOverviewScreen } from "./PaymentsOverviewScreen";
import { mockServer } from "@/testing/mockServer";
import { getPaymentsFixture } from "../infra/getPayments.fixtures";
import { screen } from "@testing-library/react-native";

describe("PaymentsOverviewScreen", () => {
  it("should render raw payments", async () => {
    mockServer.get("/payments", getPaymentsFixture);

    renderWithProviders(<PaymentsOverviewScreen />);

    expect(
      await screen.findByText("total_amount_left_to_pay", { exact: false }),
    ).toBeOnTheScreen();
  });
});

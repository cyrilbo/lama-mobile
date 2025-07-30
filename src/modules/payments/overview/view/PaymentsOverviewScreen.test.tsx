import { renderWithProviders } from "@/src/testing/render";
import { PaymentsOverviewScreen } from "./PaymentsOverviewScreen";
import { mockServer } from "@/src/testing/mockServer";
import { getPaymentsFixture } from "../infra/getPayments.fixtures";
import { screen } from "@testing-library/react-native";

describe("PaymentsOverviewScreen", () => {
  it.only("should render raw payments", async () => {
    mockServer.get("/payments", getPaymentsFixture);

    renderWithProviders(<PaymentsOverviewScreen />);

    expect(await screen.findByText("Payments Overview")).toBeOnTheScreen();
  });
});

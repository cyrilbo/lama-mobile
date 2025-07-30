import { renderWithProviders } from "@/src/testing/render";
import { PaymentsOverviewScreen } from "./PaymentsOverviewScreen";
import { mockServer } from "@/src/testing/mockServer";
import { getPaymentsFixture } from "../infra/getPayments.fixtures";
import { act, screen } from "@testing-library/react-native";

describe("PaymentsOverviewScreen", () => {
  it.only("should render raw payments", async () => {
    mockServer.get("/payments", getPaymentsFixture);

    await renderWithProviders(<PaymentsOverviewScreen />);

    expect(await screen.findByText("210.00 €")).toBeOnTheScreen();
  });
});

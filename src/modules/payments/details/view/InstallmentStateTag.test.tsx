import { renderWithProviders } from "@/src/testing/render";
import { screen } from "@testing-library/react-native";
import { InstallmentStateTag } from "./InstallmentStateTag";

describe("InstallmentStateTag", () => {
  it("renders pending state correctly", async () => {
    await renderWithProviders(
      <InstallmentStateTag installmentState="pending" />,
    );

    expect(await screen.findByText("Pending")).toBeOnTheScreen();
  });

  it("renders paid state correctly", async () => {
    await renderWithProviders(<InstallmentStateTag installmentState="paid" />);

    expect(await screen.findByText("Paid")).toBeOnTheScreen();
  });
});

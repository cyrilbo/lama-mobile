import { renderWithProviders } from "@/src/testing/render";
import { Timestamp } from "react-native-reanimated/lib/typescript/commonTypes";
import {
  getCustomerFixture,
  getInstallmentFixture,
} from "../../shared/domain/payment.fixtures";
import { InstallmentDetails } from "./InstallmentDetails";
import { screen } from "@testing-library/react-native";

describe("InstallmentDetails", () => {
  it("renders a paid installment correctly", async () => {
    const paidInstallment = getInstallmentFixture({
      state: "paid",
      due_date: 1751527297 as Timestamp,
      date_paid: 1751527335 as Timestamp,
    });
    const customer = getCustomerFixture();

    await renderWithProviders(
      <InstallmentDetails installment={paidInstallment} customer={customer} />,
    );

    expect(await screen.findByText("Amount")).toBeOnTheScreen();
    expect(await screen.findByText("€52.50")).toBeOnTheScreen();
    expect(await screen.findByText("Date")).toBeOnTheScreen();
    expect(await screen.findByText("07/03/2025")).toBeOnTheScreen();
    expect(screen.queryByText("Postpone *")).not.toBeOnTheScreen();
  });
});

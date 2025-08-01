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
      due_date: 1753433657 as Timestamp,
      date_paid: 1751287110 as Timestamp,
    });
    const customer = getCustomerFixture();

    await renderWithProviders(
      <InstallmentDetails installment={paidInstallment} customer={customer} />,
    );

    expect(await screen.findByText("Amount")).toBeOnTheScreen();
    expect(await screen.findByText("€52.50")).toBeOnTheScreen();
    expect(await screen.findByText("Due date")).toBeOnTheScreen();
    expect(await screen.findByText("07/25/2025")).toBeOnTheScreen();
    expect(await screen.findByText("Paid date")).toBeOnTheScreen();
    expect(await screen.findByText("06/30/2025")).toBeOnTheScreen();
    expect(screen.queryByText("Postpone *")).not.toBeOnTheScreen();
    expect(screen.queryByText("Change card")).not.toBeOnTheScreen();
  });

  it("allows to change the card when the installment is pending", async () => {
    const pendingInstallment = getInstallmentFixture({
      state: "pending",
    });
    const customer = getCustomerFixture();

    await renderWithProviders(
      <InstallmentDetails
        installment={pendingInstallment}
        customer={customer}
      />,
    );

    expect(await screen.findByText("Change card")).toBeOnTheScreen();
  });
});

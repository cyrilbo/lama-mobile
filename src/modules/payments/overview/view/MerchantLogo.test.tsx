import React from "react";
import { screen } from "@testing-library/react-native";
import { renderWithProviders } from "@/src/testing/render";
import { MerchantLogo } from "./MerchantLogo";

describe("MerchantLogo", () => {
  it("renders an image with the logo URL when logo URL is provided", async () => {
    const logoUrl = "https://example.com/logo.png";
    const merchantName = "Test Merchant";

    await renderWithProviders(
      <MerchantLogo logoUrl={logoUrl} merchantName={merchantName} />,
    );

    const image = screen.getByTestId("merchant-logo-image");
    expect(image).toBeOnTheScreen();
    expect(image.props.source.uri).toBe(logoUrl);
  });

  it("renders the first letter of merchant name in uppercase when logo URL is null", async () => {
    const logoUrl = null;
    const merchantName = "test merchant";

    await renderWithProviders(
      <MerchantLogo logoUrl={logoUrl} merchantName={merchantName} />,
    );

    expect(screen.getByText("T")).toBeOnTheScreen();
    expect(screen.queryByTestId("merchant-logo-image")).not.toBeOnTheScreen();
  });

  it("renders '?' when merchant name is empty string", async () => {
    const logoUrl = null;
    const merchantName = "";

    await renderWithProviders(
      <MerchantLogo logoUrl={logoUrl} merchantName={merchantName} />,
    );

    expect(screen.getByText("?")).toBeOnTheScreen();
  });
});

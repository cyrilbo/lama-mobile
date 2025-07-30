import { Text, View } from "react-native";
import { TEST_DEFAULT_DATE } from "./constants";
import { screen } from "@testing-library/react-native";
import { renderWithProviders } from "./render";

describe("global checks", () => {
  it("jest runs", () => {
    expect(true).toBeTruthy();
  });

  it("jest uses fake timers", () => {
    const callback = jest.fn();

    setTimeout(callback, 1000);

    expect(callback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(1000);

    expect(callback).toHaveBeenCalled();
  });
});

describe("date is mocked", () => {
  it("uses a mocked date", () => {
    expect(new Date(Date.now()).toISOString()).toBe(TEST_DEFAULT_DATE);
  });

  it("allows overriding the mock in a given test", () => {
    jest.setSystemTime(1244);

    expect(Date.now()).toBe(1244);
  });

  it("and then it's back to the global mock in the next test", () => {
    expect(new Date(Date.now()).toISOString()).toBe(TEST_DEFAULT_DATE);
  });
});

describe("timezone is mocked", () => {
  it("is in the Europe/Paris timezone", () => {
    // On our computers this is obviously true, but in the CI it would fail without the mock
    expect(new Date().getTimezoneOffset()).toBe(-60);
  });
});

describe("rn testing library", () => {
  it("finds rendered text", () => {
    renderWithProviders(
      <View>
        <Text>hello</Text>
      </View>,
    );

    expect(screen.getByText("hello")).toBeTruthy();
  });
});

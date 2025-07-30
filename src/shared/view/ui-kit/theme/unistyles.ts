import { StyleSheet } from "react-native-unistyles";

import { lightTheme } from "./lightTheme";

declare module "react-native-unistyles" {
  export interface UnistylesThemes {
    default: typeof lightTheme;
  }
}

StyleSheet.configure({
  themes: {
    default: lightTheme,
  },
});

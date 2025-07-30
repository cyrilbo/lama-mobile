import { memo } from "react";
import type { ColorValue } from "react-native";
import { Path, Svg } from "react-native-svg";

const SeparatorSvg = ({ color = "#1745DE" }: { color?: ColorValue }) => (
  <Svg width={8} height={20} fill="none">
    <Path fill={color} d="m6.39.279.965.259L1.143 23.72l-.966-.259z" />
  </Svg>
);
export const Separator = memo(SeparatorSvg);

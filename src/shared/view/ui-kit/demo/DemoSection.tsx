import type { ReactElement } from "react";
import { View } from "react-native";

import { Typography } from "../components/Typography/Typography";

type Props = {
  title: string;
};

export const DemoSection = ({ title }: Props): ReactElement => {
  return (
    <View>
      <Typography variant="Tagline.M">{title}</Typography>
    </View>
  );
};

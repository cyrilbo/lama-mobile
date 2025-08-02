import { Pressable, View } from "react-native";
import { StyleSheet, useUnistyles } from "react-native-unistyles";

import { Typography } from "../Typography/Typography";
import { getStyleKeyByState } from "../../helpers/styleGettersByState";
import { Icon } from "../../icons/Icon";
import type { Icons } from "../../icons/iconCatalog";

export type TagLevel =
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "error";

type TagProps = {
  disabled?: boolean;
  level?: TagLevel;
  onPressCross?: () => void;
  leftIcon?: Icons;
  label: string;
};

export const Tag = ({
  disabled = false,
  level = "primary",
  onPressCross,
  leftIcon,
  label,
}: TagProps) => {
  const { theme } = useUnistyles();

  const color = getStyleKeyByState(
    theme,
    "components.tag",
    getTagStyleState(disabled, level),
    "content-color",
  );

  return (
    <View style={styles.container(disabled, level)}>
      <View style={styles.content}>
        {leftIcon && (
          <Icon
            size={theme.components["icon-size-S"]}
            color={color}
            icon={leftIcon}
          />
        )}
        <Typography variant="Text.P2.Paragraph" color={color}>
          {label}
        </Typography>
        {onPressCross && (
          <Pressable onPress={onPressCross} disabled={disabled}>
            <View style={styles.crossIconContainer}>
              <Icon
                size={theme.components["icon-size-S"]}
                color={color}
                icon="X"
              />
            </View>
          </Pressable>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create(({ components, sizes }) => ({
  container: (disabled: boolean, level: TagLevel) => ({
    paddingVertical: components.tag["vertical-padding"],
    paddingLeft: components.tag["left-padding"],
    paddingRight: components.tag["right-padding"],
    borderRadius: components.tag["corner-radius"],
    backgroundColor: disabled
      ? components.tag.disabled["background-color"]
      : components.tag.level[level]["background-color"],
  }),
  crossIconContainer: {
    width: components.tag["close-icon-size"],
    height: components.tag["close-icon-size"],
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    alignSelf: "baseline",
    flexDirection: "row",
    alignItems: "center",
    gap: components.tag.gap,
    minHeight: sizes["size-250"],
  },
}));

type TagStyleKey = `level.${Exclude<TagLevel, "default">}` | "disabled";

const getTagStyleState = (
  disabled: boolean,
  level: Exclude<TagLevel, undefined>,
): TagStyleKey => {
  if (disabled) {
    return "disabled";
  }

  return `level.${level}`;
};

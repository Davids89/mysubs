import {
  StyleSheet,
  Text,
  View,
  type StyleProp,
  type ViewStyle,
} from "react-native";

import { useTheme } from "./theme/ThemeProvider.js";
import type { Theme } from "./theme/tokens.js";

type Props = {
  label: string;
  style?: StyleProp<ViewStyle>;
  variant?: keyof Theme["colors"]["semantic"];
};

/** Pill used for tags and statuses; colors come from the semantic palette. */
export function Badge({ label, style, variant = "neutral" }: Props) {
  const theme = useTheme();
  const tone = theme.colors.semantic[variant];

  return (
    <View
      style={[
        styles.badge,
        {
          backgroundColor: tone.background,
          borderRadius: theme.radius.pill,
          paddingHorizontal: theme.components.badge.paddingHorizontal,
          paddingVertical: theme.components.badge.paddingVertical,
        },
        style,
      ]}
    >
      <Text
        style={{
          color: tone.text,
          fontSize: theme.typography.caption.size,
          fontWeight: theme.typography.label.weight,
        }}
      >
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignItems: "center",
    alignSelf: "flex-start",
    flexDirection: "row",
  },
});

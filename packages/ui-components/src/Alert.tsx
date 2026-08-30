import {
  Pressable,
  StyleSheet,
  Text,
  View,
  type StyleProp,
  type ViewStyle,
} from "react-native";

import { useTheme } from "./theme/ThemeProvider.js";
import type { Theme } from "./theme/tokens.js";

type SemanticTone = keyof Theme["colors"]["semantic"];

const ALERT_TONES: Record<AlertType, SemanticTone> = {
  error: "danger",
  info: "neutral",
  success: "success",
  warning: "warning",
};

type AlertType = "error" | "info" | "success" | "warning";

type Props = {
  message: string;
  /** Renders the dismiss control when provided. */
  onDismiss?: () => void;
  style?: StyleProp<ViewStyle>;
  title?: string;
  type?: AlertType;
};

/** Inline banner for info, success, warning and error feedback. */
export function Alert({ message, onDismiss, style, title, type = "info" }: Props) {
  const theme = useTheme();
  const tone = theme.colors.semantic[ALERT_TONES[type]];

  return (
    <View
      accessibilityRole="alert"
      style={[
        styles.alert,
        {
          backgroundColor: tone.background,
          borderRadius: theme.radius.md,
          gap: theme.spacing.sm,
          padding: theme.spacing.md,
        },
        style,
      ]}
    >
      <AlertBody color={tone.text} message={message} title={title} />
      {onDismiss ? (
        <Pressable
          accessibilityLabel="Dismiss"
          accessibilityRole="button"
          onPress={onDismiss}
        >
          <Text style={{ color: tone.text, fontSize: theme.typography.body.size }}>
            ✕
          </Text>
        </Pressable>
      ) : null}
    </View>
  );
}

function AlertBody({
  color,
  message,
  title,
}: {
  color: string;
  message: string;
  title?: string;
}) {
  const theme = useTheme();

  return (
    <View style={styles.body}>
      {title ? (
        <Text
          style={{
            color,
            fontSize: theme.typography.bodySmall.size,
            fontWeight: theme.typography.label.weight,
          }}
        >
          {title}
        </Text>
      ) : null}
      <Text
        style={{ color, fontSize: theme.typography.bodySmall.size }}
      >
        {message}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  alert: {
    alignItems: "flex-start",
    flexDirection: "row",
  },
  body: {
    flex: 1,
    gap: 2,
  },
});

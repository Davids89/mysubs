import {
  Modal as NativeModal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import type { ReactNode } from "react";

import { useTheme } from "./theme/ThemeProvider.js";

type Props = {
  children: ReactNode;
  onClose: () => void;
  title?: string;
  visible: boolean;
};

/** Centered dialog with a tappable backdrop. */
export function Modal({ children, onClose, title, visible }: Props) {
  const theme = useTheme();

  return (
    <NativeModal
      animationType="fade"
      onRequestClose={onClose}
      transparent
      visible={visible}
    >
      <View style={styles.backdrop}>
        <Pressable
          accessibilityLabel="Close"
          accessibilityRole="button"
          onPress={onClose}
          style={StyleSheet.absoluteFill}
        />
        <View
          style={[
            styles.sheet,
            {
              backgroundColor: theme.colors.surface.raised,
              borderRadius: theme.radius.lg,
              gap: theme.spacing.md,
              padding: theme.spacing.lg,
            },
          ]}
        >
          {title ? (
            <Text
              style={{
                color: theme.typography.heading.color,
                fontSize: theme.typography.heading.size,
                fontWeight: theme.typography.heading.weight,
              }}
            >
              {title}
            </Text>
          ) : null}
          {children}
        </View>
      </View>
    </NativeModal>
  );
}

// The token set has no scrim color, so the backdrop is the one place this
// file uses literals. See docs/component-guidelines.md §5.
const styles = StyleSheet.create({
  backdrop: {
    alignItems: "center",
    backgroundColor: "rgba(23, 33, 28, 0.45)",
    flex: 1,
    justifyContent: "center",
    padding: 24,
  },
  sheet: {
    maxWidth: 420,
    width: "100%",
  },
});

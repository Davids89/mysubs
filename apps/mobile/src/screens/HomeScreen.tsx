import { useTheme } from "@mysubs/ui-components";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useHomeScreen } from "../hooks/useHomeScreen";

export function HomeScreen() {
  const theme = useTheme();
  const content = useHomeScreen();

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: theme.colors.background }]}
    >
      <View style={[styles.card, { backgroundColor: theme.colors.card }]}>
        <Text style={[styles.eyebrow, { color: theme.colors.primary }]}>
          {content.eyebrow}
        </Text>
        <Text style={[styles.title, { color: theme.colors.text }]}>
          {content.title}
        </Text>
        <Text style={[styles.subtitle, { color: theme.colors.mutedText }]}>
          {content.subtitle}
        </Text>
        <View style={[styles.badge, { backgroundColor: theme.colors.primary }]}>
          <Text style={[styles.badgeText, { color: theme.colors.primaryText }]}>
            {content.actionLabel}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: "flex-start",
    borderRadius: 999,
    marginTop: 24,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  badgeText: {
    fontSize: 14,
    fontWeight: "600",
  },
  card: {
    borderRadius: 24,
    padding: 24,
  },
  eyebrow: {
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 12,
    textTransform: "uppercase",
  },
  safeArea: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 24,
    marginTop: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    lineHeight: 38,
  },
});

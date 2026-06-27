import { useTheme } from "@mysubs/ui-components";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useHomeScreen } from "../hooks/useHomeScreen";

export function HomeScreen() {
  const theme = useTheme();
  const content = useHomeScreen();

  return (
    <SafeAreaView
      style={[
        styles.safeArea,
        { backgroundColor: theme.colors.surface.page },
      ]}
    >
      <View
        style={[
          styles.header,
          {
            backgroundColor: theme.colors.surface.raised,
            borderColor: theme.colors.border.default,
            borderWidth: theme.strokeWidth.default,
            padding: theme.spacing.lg,
          },
        ]}
      >
        <View style={styles.titleGroup}>
          <Text
            style={[
              styles.title,
              {
                color: theme.typography.title.color,
                fontSize: theme.typography.title.size,
                fontWeight: theme.typography.title.weight,
              },
            ]}
          >
            {content.title}
          </Text>
          <Text
            style={[
              styles.subtitle,
              {
                color: theme.colors.textRole.muted,
                fontSize: theme.typography.caption.size,
              },
            ]}
          >
            {content.subtitle}
          </Text>
        </View>
        <View style={[styles.statRow, { gap: theme.spacing.sm }]}>
          {content.stats.map((stat) => (
            <View
              key={stat.label}
              style={[
                styles.statChip,
                {
                  backgroundColor: theme.colors.surface.subtle,
                  borderRadius: theme.radius.lg,
                  paddingHorizontal: theme.spacing.md,
                  paddingVertical: theme.spacing.sm,
                },
              ]}
            >
              <Text
                style={[
                  styles.statValue,
                  {
                    color: theme.colors.textRole.primary,
                    fontSize: theme.typography.body.size,
                    fontWeight: theme.typography.label.weight,
                  },
                ]}
              >
                {stat.value}
              </Text>
              <Text
                style={[
                  styles.statLabel,
                  {
                    color: theme.colors.textRole.muted,
                    fontSize: theme.typography.caption.size,
                  },
                ]}
              >
                {stat.label}
              </Text>
            </View>
          ))}
        </View>
      </View>
      <View style={[styles.content, { padding: theme.spacing.md }]}>
        <View
          style={[
            styles.emptyState,
            {
              backgroundColor: theme.colors.surface.subtle,
              borderColor: theme.colors.border.default,
              borderRadius: theme.radius.lg,
              borderWidth: theme.strokeWidth.default,
              paddingHorizontal: theme.components.emptyState.paddingHorizontal,
              paddingVertical: theme.components.emptyState.paddingVertical,
            },
          ]}
        >
          <View
            accessibilityElementsHidden
            importantForAccessibility="no-hide-descendants"
            style={[
              styles.appIcon,
              {
                backgroundColor: theme.colors.brand.primary,
                borderRadius: theme.radius.xl,
              },
            ]}
          >
            <View
              style={[
                styles.appIconLineLarge,
                { backgroundColor: theme.colors.textRole.inverse },
              ]}
            />
            <View
              style={[
                styles.appIconLineMedium,
                { backgroundColor: theme.colors.textRole.inverse },
              ]}
            />
            <View
              style={[
                styles.appIconLineSmall,
                { backgroundColor: theme.colors.textRole.inverse },
              ]}
            />
          </View>
          <Text
            style={[
              styles.emptyTitle,
              {
                color: theme.colors.textRole.primary,
                fontSize: theme.typography.body.size,
                fontWeight: theme.typography.label.weight,
              },
            ]}
          >
            {content.emptyTitle}
          </Text>
          <Text
            style={[
              styles.emptyBody,
              {
                color: theme.colors.textRole.muted,
                fontSize: theme.typography.bodySmall.size,
              },
            ]}
          >
            {content.emptyBody}
          </Text>
          <View
            accessibilityRole="button"
            style={[
              styles.primaryButton,
              {
                backgroundColor: theme.colors.brand.primary,
                borderRadius: theme.radius.md,
                height: theme.components.button.height,
                paddingHorizontal: theme.components.button.paddingHorizontal,
              },
            ]}
          >
            <Text
              style={[
                styles.primaryButtonText,
                {
                  color: theme.colors.textRole.inverse,
                  fontSize: theme.typography.body.size,
                  fontWeight: theme.typography.label.weight,
                },
              ]}
            >
              {content.actionLabel}
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  appIcon: {
    height: 72,
    justifyContent: "center",
    marginBottom: 8,
    paddingLeft: 16,
    width: 72,
  },
  appIconLineLarge: {
    borderRadius: 2,
    height: 5,
    marginBottom: 6,
    width: 36,
  },
  appIconLineMedium: {
    borderRadius: 2,
    height: 5,
    marginBottom: 6,
    width: 28,
  },
  appIconLineSmall: {
    borderRadius: 2,
    height: 5,
    width: 18,
  },
  content: {
    flex: 1,
  },
  emptyBody: {
    lineHeight: 21,
    marginBottom: 16,
    textAlign: "center",
  },
  emptyState: {
    alignItems: "center",
  },
  emptyTitle: {
    lineHeight: 21,
    marginBottom: 8,
    textAlign: "center",
  },
  header: {
    gap: 16,
  },
  primaryButton: {
    alignItems: "center",
    justifyContent: "center",
  },
  primaryButtonText: {
    lineHeight: 21,
  },
  safeArea: {
    flex: 1,
  },
  statChip: {
    alignItems: "center",
    flex: 1,
  },
  statLabel: {
    lineHeight: 14,
    marginTop: 2,
  },
  statRow: {
    flexDirection: "row",
  },
  statValue: {
    lineHeight: 21,
  },
  subtitle: {
    lineHeight: 16,
  },
  title: {
    lineHeight: 28,
  },
  titleGroup: {
    gap: 4,
  },
});

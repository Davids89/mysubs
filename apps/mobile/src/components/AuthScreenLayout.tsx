import { useTheme } from "@subtrack/ui-components";
import type { ReactNode } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Props = {
  children: ReactNode;
  subtitle: string;
  title: string;
};

export function AuthScreenLayout({ children, subtitle, title }: Props) {
  const theme = useTheme();

  return (
    <SafeAreaView
      style={[
        styles.safeArea,
        { backgroundColor: theme.colors.surface.page },
      ]}
    >
      <ScrollView
        contentContainerStyle={[
          styles.content,
          {
            paddingHorizontal: theme.spacing["2xl"],
            paddingTop: theme.spacing.hero,
          },
        ]}
      >
        <View style={[styles.header, { gap: theme.spacing.sm }]}>
          <Text
            style={[
              styles.brand,
              {
                color: theme.colors.brand.primary,
                fontSize: theme.typography.title.size,
                fontWeight: theme.typography.title.weight,
              },
            ]}
          >
            Subtrack
          </Text>
          <Text
            style={[
              styles.title,
              {
                color: theme.colors.textRole.primary,
                fontSize: theme.typography.title.size,
                fontWeight: theme.typography.title.weight,
              },
            ]}
          >
            {title}
          </Text>
          <Text
            style={[
              styles.subtitle,
              {
                color: theme.colors.textRole.muted,
                fontSize: theme.typography.bodySmall.size,
              },
            ]}
          >
            {subtitle}
          </Text>
        </View>
        <View
          style={[
            styles.card,
            {
              backgroundColor: theme.colors.surface.raised,
              borderRadius: theme.radius.lg,
              gap: theme.spacing.lg,
              padding: theme.spacing.xl,
            },
          ]}
        >
          {children}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  brand: {
    lineHeight: 28,
  },
  card: {},
  content: {
    flexGrow: 1,
    justifyContent: "center",
    paddingBottom: 24,
  },
  header: {
    marginBottom: 24,
  },
  safeArea: {
    flex: 1,
  },
  subtitle: {
    lineHeight: 21,
  },
  title: {
    lineHeight: 28,
  },
});

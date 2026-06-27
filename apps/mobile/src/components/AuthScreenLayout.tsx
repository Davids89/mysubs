import { useTheme } from "@mysubs/ui-components";
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
      style={[styles.safeArea, { backgroundColor: theme.colors.background }]}
    >
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={[styles.brand, { color: theme.colors.primary }]}>
            Subtrack
          </Text>
          <Text style={[styles.title, { color: theme.colors.text }]}>
            {title}
          </Text>
          <Text style={[styles.subtitle, { color: theme.colors.mutedText }]}>
            {subtitle}
          </Text>
        </View>
        <View style={[styles.card, { backgroundColor: theme.colors.card }]}>
          {children}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  brand: {
    fontSize: 18,
    fontWeight: "700",
  },
  card: {
    borderRadius: 24,
    gap: 16,
    padding: 24,
  },
  content: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 24,
  },
  header: {
    gap: 8,
    marginBottom: 24,
  },
  safeArea: {
    flex: 1,
  },
  subtitle: {
    fontSize: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
  },
});

import { Button, TextField, useTheme } from "@subtrack/ui-components";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { AuthScreenLayout } from "../components/AuthScreenLayout";
import { useLoginScreen } from "../hooks/useLoginScreen";

export function LoginScreen() {
  const theme = useTheme();
  const {
    error,
    form,
    forgotPassword,
    goToRegister,
    isSubmitting,
    notice,
    submit,
    updateField,
  } = useLoginScreen();

  return (
    <AuthScreenLayout
      subtitle="Manage your subscriptions"
      title="Sign in"
    >
      <TextField
        autoCapitalize="none"
        keyboardType="email-address"
        label="Email"
        onChangeText={(value) => updateField("email", value)}
        placeholder="you@email.com"
        value={form.email}
      />
      <TextField
        label="Password"
        onChangeText={(value) => updateField("password", value)}
        placeholder="••••••••"
        secureTextEntry
        value={form.password}
      />
      <Pressable onPress={forgotPassword} style={styles.forgotPassword}>
        <Text
          style={{
            color: theme.colors.brand.dark,
            fontWeight: theme.typography.label.weight,
          }}
        >
          Forgot your password?
        </Text>
      </Pressable>
      {notice ? (
        <Text style={{ color: theme.colors.mutedText }}>{notice}</Text>
      ) : null}
      {error ? (
        <Text style={{ color: theme.colors.semantic.danger.text }}>{error}</Text>
      ) : null}
      <Button disabled={isSubmitting} label="Sign in" onPress={submit} />
      <View style={styles.footer}>
        <Text style={{ color: theme.colors.mutedText }}>
          Don&apos;t have an account?
        </Text>
        <Pressable onPress={goToRegister}>
          <Text
            style={[
              styles.link,
              {
                color: theme.colors.brand.dark,
                fontWeight: theme.typography.label.weight,
              },
            ]}
          >
            Sign up for free
          </Text>
        </Pressable>
      </View>
    </AuthScreenLayout>
  );
}

const styles = StyleSheet.create({
  footer: {
    alignItems: "center",
    gap: 4,
  },
  forgotPassword: {
    alignSelf: "flex-end",
  },
  link: {},
});

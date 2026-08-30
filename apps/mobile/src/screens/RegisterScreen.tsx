import { Button, TextField, useTheme } from "@subtrack/ui-components";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { AuthScreenLayout } from "../components/AuthScreenLayout";
import { useRegisterScreen } from "../hooks/useRegisterScreen";

export function RegisterScreen() {
  const theme = useTheme();
  const {
    errors,
    form,
    goBack,
    goToLogin,
    isSubmitting,
    submit,
    updateField,
  } = useRegisterScreen();

  return (
    <AuthScreenLayout subtitle="It only takes a moment" title="Create your account">
      <Pressable onPress={goBack}>
        <Text
          style={[
            styles.link,
            {
              color: theme.colors.brand.dark,
              fontWeight: theme.typography.label.weight,
            },
          ]}
        >
          Back
        </Text>
      </Pressable>
      <TextField
        error={errors.firstName}
        label="First name"
        onChangeText={(value) => updateField("firstName", value)}
        placeholder="Ana"
        value={form.firstName}
      />
      <TextField
        error={errors.lastName}
        label="Last name"
        onChangeText={(value) => updateField("lastName", value)}
        placeholder="Garcia"
        value={form.lastName}
      />
      <TextField
        autoCapitalize="none"
        error={errors.email}
        keyboardType="email-address"
        label="Email"
        onChangeText={(value) => updateField("email", value)}
        placeholder="ana@email.com"
        value={form.email}
      />
      <TextField
        error={errors.password}
        label="Password"
        onChangeText={(value) => updateField("password", value)}
        placeholder="••••••••"
        secureTextEntry
        value={form.password}
      />
      <TextField
        error={errors.confirmPassword}
        label="Confirm password"
        onChangeText={(value) => updateField("confirmPassword", value)}
        placeholder="••••••••"
        secureTextEntry
        value={form.confirmPassword}
      />
      <Text style={{ color: theme.colors.mutedText }}>
        By signing up you accept the terms of use and the privacy policy
      </Text>
      {errors.form ? (
        <Text style={{ color: theme.colors.semantic.danger.text }}>
          {errors.form}
        </Text>
      ) : null}
      <Button disabled={isSubmitting} label="Create account" onPress={submit} />
      <View style={styles.footer}>
        <Text style={{ color: theme.colors.mutedText }}>
          Already have an account?
        </Text>
        <Pressable onPress={goToLogin}>
          <Text
            style={[
              styles.link,
              {
                color: theme.colors.brand.dark,
                fontWeight: theme.typography.label.weight,
              },
            ]}
          >
            Sign in
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
  link: {},
});

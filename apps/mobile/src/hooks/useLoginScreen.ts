import { useRouter } from "expo-router";
import { useState } from "react";

import { authApiClient } from "../api/authApiClient";
import { useAuthSession } from "../auth/AuthSessionProvider";

type LoginForm = {
  email: string;
  password: string;
};

export const useLoginScreen = () => {
  const router = useRouter();
  const session = useAuthSession();
  const [form, setForm] = useState<LoginForm>({ email: "", password: "" });
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateField = (field: keyof LoginForm, value: string): void => {
    setForm((current) => ({ ...current, [field]: value }));
    setError(null);
  };

  const submit = async (): Promise<void> => {
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await authApiClient.login(form);
      await session.signIn(response.token);
      router.replace("/home");
    } catch (failure) {
      setError(getErrorMessage(failure));
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    error,
    form,
    isSubmitting,
    // ponytail: stub until the phase 2 reset flow lands.
    forgotPassword: () => setNotice("Password recovery is coming soon."),
    goToRegister: () => router.push("/(auth)/register"),
    notice,
    submit,
    updateField,
  };
};

const getErrorMessage = (error: unknown): string =>
  error instanceof Error ? error.message : "Could not sign in";

import {
  isPasswordLongEnough,
  isValidEmail,
  validatePasswordConfirmation,
} from "@subtrack/business-logic";
import { useRouter } from "expo-router";
import { useState } from "react";

import { authApiClient } from "../api/authApiClient";
import { useAuthSession } from "../auth/AuthSessionProvider";

type RegisterForm = {
  confirmPassword: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
};

type RegisterErrors = Partial<Record<keyof RegisterForm | "form", string>>;

const initialForm: RegisterForm = {
  confirmPassword: "",
  email: "",
  firstName: "",
  lastName: "",
  password: "",
};

export const useRegisterScreen = () => {
  const router = useRouter();
  const session = useAuthSession();
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState<RegisterErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateField = (field: keyof RegisterForm, value: string): void => {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined, form: undefined }));
  };

  const submit = async (): Promise<void> => {
    const validationErrors = validateForm(form);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    await registerUser();
  };

  const registerUser = async (): Promise<void> => {
    setIsSubmitting(true);

    try {
      const response = await authApiClient.register(form);
      await session.signIn(response.token);
      router.replace({
        pathname: "/(auth)/registration-success",
        params: { firstName: response.user.firstName },
      });
    } catch (error) {
      setErrors({ form: getErrorMessage(error) });
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    errors,
    form,
    goBack: () => router.back(),
    goToLogin: () => router.replace("/(auth)/login"),
    isSubmitting,
    submit,
    updateField,
  };
};

const validateForm = (form: RegisterForm): RegisterErrors => ({
  ...(!form.firstName.trim() ? { firstName: "Name is required" } : {}),
  ...(!form.lastName.trim() ? { lastName: "Surname is required" } : {}),
  ...(!isValidEmail(form.email) ? { email: "Enter a valid email" } : {}),
  ...(!isPasswordLongEnough(form.password)
    ? { password: "Password must be at least 8 characters" }
    : {}),
  ...(!validatePasswordConfirmation(form)
    ? { confirmPassword: "Passwords must match" }
    : {}),
});

const getErrorMessage = (error: unknown): string =>
  error instanceof Error ? error.message : "Could not create account";

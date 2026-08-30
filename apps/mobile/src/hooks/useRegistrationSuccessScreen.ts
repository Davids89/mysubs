import { useLocalSearchParams, useRouter } from "expo-router";

type RegistrationSuccessContent = {
  actionLabel: string;
  subtitle: string;
  title: string;
};

export const useRegistrationSuccessScreen = () => {
  const router = useRouter();
  const { firstName } = useLocalSearchParams<{ firstName?: string }>();
  const displayName = firstName ?? "Subtrack";

  const content: RegistrationSuccessContent = {
    actionLabel: "Go to my subscriptions",
    subtitle: `Welcome to Subtrack, ${displayName}. You can start managing your subscriptions now.`,
    title: "Account created",
  };

  return {
    content,
    goToHome: () => router.replace("/home"),
  };
};

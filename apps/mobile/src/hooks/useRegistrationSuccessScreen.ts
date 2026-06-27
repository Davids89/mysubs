import { useLocalSearchParams, useRouter } from "expo-router";

export const useRegistrationSuccessScreen = () => {
  const router = useRouter();
  const { firstName } = useLocalSearchParams<{ firstName?: string }>();
  const displayName = firstName ?? "Subtrack";

  return {
    displayName,
    goToHome: () => router.replace("/home"),
  };
};

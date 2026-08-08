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
    actionLabel: "Ir a mis suscripciones",
    subtitle: `Bienvenida a Subtrack, ${displayName}. Ya puedes empezar a gestionar tus suscripciones.`,
    title: "Cuenta creada",
  };

  return {
    content,
    goToHome: () => router.replace("/home"),
  };
};

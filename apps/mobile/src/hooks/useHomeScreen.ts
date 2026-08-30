import { useRouter } from "expo-router";

import { useAuthSession } from "../auth/AuthSessionProvider";

type StatChipContent = {
  label: string;
  value: string;
};

type HomeScreenContent = {
  actionLabel: string;
  emptyBody: string;
  emptyTitle: string;
  signOutLabel: string;
  stats: StatChipContent[];
  subtitle: string;
  title: string;
};

const content: HomeScreenContent = {
  actionLabel: "Add subscription",
  emptyBody: "Add your first subscription to start managing them.",
  emptyTitle: "Add your first subscription",
  signOutLabel: "Sign out",
  stats: [
    {
      label: "Monthly",
      value: "€0",
    },
    {
      label: "Active",
      value: "0",
    },
    {
      label: "Shared",
      value: "0",
    },
  ],
  subtitle: "0 active subscriptions",
  title: "My subscriptions",
};

export const useHomeScreen = () => {
  const router = useRouter();
  const session = useAuthSession();

  return {
    ...content,
    signOut: async (): Promise<void> => {
      await session.signOut();
      router.replace("/(auth)/login");
    },
  };
};

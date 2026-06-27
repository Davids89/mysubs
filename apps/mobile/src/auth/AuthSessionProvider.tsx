import * as SecureStore from "expo-secure-store";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const AUTH_TOKEN_KEY = "subtrack.authToken";

type AuthSession = {
  isLoading: boolean;
  signIn(token: string): Promise<void>;
  signOut(): Promise<void>;
  token: string | null;
};

const AuthSessionContext = createContext<AuthSession | null>(null);

type Props = {
  children: ReactNode;
};

export function AuthSessionProvider({ children }: Props) {
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    void loadToken();
  }, []);

  const loadToken = async (): Promise<void> => {
    setToken(await SecureStore.getItemAsync(AUTH_TOKEN_KEY));
    setIsLoading(false);
  };

  const signIn = useCallback(async (nextToken: string): Promise<void> => {
    await SecureStore.setItemAsync(AUTH_TOKEN_KEY, nextToken);
    setToken(nextToken);
  }, []);

  const signOut = useCallback(async (): Promise<void> => {
    await SecureStore.deleteItemAsync(AUTH_TOKEN_KEY);
    setToken(null);
  }, []);

  const value = useMemo(
    () => ({ isLoading, signIn, signOut, token }),
    [isLoading, signIn, signOut, token],
  );

  return (
    <AuthSessionContext.Provider value={value}>
      {children}
    </AuthSessionContext.Provider>
  );
}

export const useAuthSession = (): AuthSession => {
  const session = useContext(AuthSessionContext);

  if (!session) {
    throw new Error("useAuthSession must be used within AuthSessionProvider");
  }

  return session;
};

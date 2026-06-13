import { createContext, ReactNode, useContext } from "react";

import { lightTheme, Theme } from "./tokens.js";

const ThemeContext = createContext<Theme>(lightTheme);

type Props = {
  children: ReactNode;
  theme?: Theme;
};

export function ThemeProvider({ children, theme = lightTheme }: Props) {
  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
}

export const useTheme = (): Theme => useContext(ThemeContext);

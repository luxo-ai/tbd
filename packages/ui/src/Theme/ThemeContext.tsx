import React, { useContext } from 'react';
import { baseOverrides, lightnessMap, theme } from './theme';
import type { RothkoKind, Color, ColorableKey, GreyScale, Theme } from './types';
import { greyScale, isGreyScale, greyScaleInverse } from './types';

type Mode = 'dark' | 'light';

export const ThemeProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const value: ThemeContext = {
    theme,
    mode: 'light',
  };
  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export const useTheme = () => {
  const ctx = useContext(Context);
  if (!ctx) {
    throw new Error("sick you're outside of the theme context, congrats");
  }
  return ctx;
};

type Colorer = (c?: ColorableKey) => Color;
export type CanColor = { themeColorer: Colorer };

export const useKindTheme = (kind: RothkoKind | GreyScale) => {
  const { theme } = useTheme();

  const colorWithKind: Colorer = c => {
    if (isGreyScale(kind)) {
      return c === 'text' ? greyScale[greyScaleInverse[kind]] : greyScale[kind];
    }
    if (!c) return kind === 'info' ? theme[`secondary-400`] : theme[`${kind}-500`];
    const override = baseOverrides[kind][c];
    if (override) return override;
    if (c === 'text') return greyScale.black;
    const lightness = lightnessMap[c];
    return theme[`${kind}-${lightness}`];
  };

  return [colorWithKind, theme] as const;
};

type ThemeContext = {
  theme: Theme;
  mode: Mode;
};

const Context = React.createContext<ThemeContext | null>(null);

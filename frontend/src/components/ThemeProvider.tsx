import React, { createContext, useContext, useEffect, useState } from 'react';

export type Theme = 'obsidian-tech' | 'midnight-aurora' | 'minimal-ivory' | 'cyber-noir' | 'solar-dusk';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  defaultTheme = 'obsidian-tech',
}) => {
  const [theme, setTheme] = useState<Theme>(() => {
    // Check localStorage for saved theme
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('portfolio-theme') as Theme;
      return saved || defaultTheme;
    }
    return defaultTheme;
  });

  useEffect(() => {
    const root = window.document.documentElement;

    // Remove previous theme classes
    root.classList.remove('obsidian-tech', 'midnight-aurora', 'minimal-ivory', 'cyber-noir', 'solar-dusk');

    // Add current theme class
    root.classList.add(theme);

    // Save to localStorage
    localStorage.setItem('portfolio-theme', theme);
  }, [theme]);

  const value = {
    theme,
    setTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

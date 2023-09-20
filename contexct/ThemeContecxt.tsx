'use client'
import React, { createContext, useState, ReactNode, useEffect } from "react";

interface ThemeContextType {
  toggle: () => void
  mode: string
}

const initialThemeContext: ThemeContextType = {
  toggle: () => { },
  mode: 'dark',
};

export const ThemeContext = createContext<ThemeContextType>(initialThemeContext)

interface ThemeProviderProps {
  children: ReactNode
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {

  const [mode, setMode] = useState<string>(() => {

    const storedMode = localStorage.getItem('theme');
    return storedMode || 'light' //default value
  })

  useEffect(() => {
    localStorage.setItem('theme', mode);
  }, [mode])

  const toggle = () => {
    setMode(prevMode => (prevMode === 'dark' ? 'light' : 'dark'));
  }

  return (
    <ThemeContext.Provider value={{ toggle, mode }}>
      <div className={`theme ${mode}`}>{children}</div>
    </ThemeContext.Provider>
  )
}

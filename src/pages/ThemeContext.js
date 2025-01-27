// ThemeContext.js  
import React, { createContext, useContext, useEffect, useState } from 'react';  
import { useMantineColorScheme } from '@mantine/core';

const ThemeContext = createContext();  

export const ThemeProvider = ({ children }) => {  
  const [isDark, setIsDark] = useState(false);  
  const { setColorScheme } = useMantineColorScheme();

  useEffect(() => {  
    const savedTheme = localStorage.getItem("theme");  
    if (savedTheme) {  
      setIsDark(savedTheme === "dark");  
    }  
  }, []);  

  const toggleTheme = () => {  
    setIsDark((prev) => {  
      const newTheme = !prev;  
      localStorage.setItem("theme", newTheme ? "dark" : "light");  
      setColorScheme(newTheme ? "dark" : "light");
      return newTheme;  
    });  
  };  

  return (  
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>  
      {children}  
    </ThemeContext.Provider>  
  );  
};  

export const useTheme = () => useContext(ThemeContext);
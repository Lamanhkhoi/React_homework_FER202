import { createContext, useState, useEffect } from "react";

const themes = {
  dark: {
    backgroundColor: 'black',
    color: 'white'
  },
  light: {
    backgroundColor: 'white',
    color: 'black'
  }
}

const initialState = {
  dark: false,
  theme: themes.light,
  toggle: () => {}
}
const ThemeContext = createContext(initialState);

function ThemeProvider({ children }) {

  const [dark, setDark] = useState(() => localStorage.getItem("dark") === "true"); 

  useEffect(() => {
    document.documentElement.setAttribute("data-bs-theme", dark ? "dark" : "light");
    localStorage.setItem("dark", JSON.stringify(dark));
}, [dark]);
  
    const toggle = () => {
      const isDark = !dark
      localStorage.setItem('dark',JSON.stringify(isDark))
      setDark(isDark)

    }
    const theme = dark ? themes.dark : themes.light
  return (
  
    <ThemeContext.Provider value={{theme,dark,toggle}}>
      {children}
    </ThemeContext.Provider>
  );
}

export { ThemeContext, ThemeProvider };

// ThemeContext.jsx - Quan ly theme Dark/Light cho TOAN BO app
// Y tuong giong EX_4 (Exercise 9), nhung lan nay theme phai ap dung
// cho moi phan tu, khong chi thanh nav.
import { createContext, useState, useEffect } from "react";


//   Gia tri mac dinh nen co: dark (boolean) va toggle (ham rong).
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
  // TODO 2: Tao state `dark` bang useState.
  //   Goi y: gia tri ban dau co the doc thang tu localStorage
  //   (localStorage.getItem("dark") === "true").
  const [dark, setDark] = useState(() => localStorage.getItem("dark") === "true"); 
  // TODO 3: useEffect #1 - moi khi `dark` thay doi:
  //   a) Gan thuoc tinh data-bs-theme len the <html>:
  //        document.documentElement.setAttribute("data-bs-theme", ...)
  //      -> Bootstrap 5.3 se tu doi mau Navbar, Button, Modal...
  //   b) Luu `dark` vao localStorage.
  //   Cau hoi tu kiem tra: mang dependency o day la gi?
  useEffect(() => {
    document.documentElement.setAttribute("data-bs-theme", dark ? "dark" : "light");
    localStorage.setItem("dark", JSON.stringify(dark));
}, [dark]);
  // TODO 4: Viet ham toggle() dao nguoc gia tri `dark`.
    const toggle = () => {
      const isDark = !dark
      localStorage.setItem('dark',JSON.stringify(isDark))
      setDark(isDark)

    }
    const theme = dark ? themes.dark : themes.light
  return (
    // TODO 5: Truyen { dark, toggle } vao value.
    <ThemeContext.Provider value={{theme,dark,toggle}}>
      {children}
    </ThemeContext.Provider>
  );
}

export { ThemeContext, ThemeProvider };

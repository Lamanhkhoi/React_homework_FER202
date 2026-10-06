import { createContext, useState, useEffect } from "react";

const AuthContext = createContext({
  user: null,
  login: () => {},
  logout: () => {},
});

function AuthProvider({ children }) {
  // State luu nguoi dung dang dang nhap. null = chua dang nhap.
  const [user, setUser] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("user");
    if (saved) {
      setUser(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  const login = () => {
    setUser({ user: "Aaron" });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };

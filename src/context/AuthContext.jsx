import { createContext, useContext, useEffect, useState } from "react";
import { ADMIN } from "../lib/seed";

const AuthContext = createContext(null);
const SESSION_KEY = "bedifferent:admin-session";

export function AuthProvider({ children }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    try {
      const token = localStorage.getItem(SESSION_KEY);
      if (token === "ok") setIsAdmin(true);
    } catch {
      /* ignore */
    }
    setChecked(true);
  }, []);

  function login(username, password) {
    const ok =
      username.trim() === ADMIN.username &&
      password.trim() === ADMIN.password.trim();
    if (ok) {
      setIsAdmin(true);
      try {
        localStorage.setItem(SESSION_KEY, "ok");
      } catch {
        /* ignore */
      }
    }
    return ok;
  }

  function logout() {
    setIsAdmin(false);
    try {
      localStorage.removeItem(SESSION_KEY);
    } catch {
      /* ignore */
    }
  }

  return (
    <AuthContext.Provider value={{ isAdmin, checked, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

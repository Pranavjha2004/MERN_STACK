// src/context/AuthContext.jsx or inside App.jsx
import { createContext, useEffect, useState } from "react";
import axios from "../axios"; // your axios instance

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  const checkAuth = async () => {
    try {
      const res = await axios.get("/auth/check");
      setIsAuthenticated(res.data.authenticated);
    } catch {
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
import { createContext, useState } from "react";
import axios from "../axios"; // your axios instance

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkAuth = async () => {
    try {
      const res = await axios.get("/auth/check-auth");
      if (res.status === 200) {
        setUser(res.data.user);
      } else {
        setUser(null);
      }
    } catch {
      console.error("Authentication check failed");
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const updateUser = (userData) => {
    setUser(userData);
  }

  return (
    <AuthContext.Provider value={{ user, loading, checkAuth, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};
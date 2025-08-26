"use client";

import useAuth from "@/hooks/useAuth";
import { createContext } from "react";

export const AuthContext = createContext({
  role: null,
  accessToken: null,
  loading: true,
  removeAccess: () => {},
  setAccessToken: () => {},
  setRole: () => {}
});

export const AuthProvider = ({ children }) => {
  const {
    accessToken,
    role,
    loading,
    removeAccess,
    setAccessToken,
    setRole
  } = useAuth();

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        role,
        loading,
        removeAccess,
        setAccessToken,
        setRole
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

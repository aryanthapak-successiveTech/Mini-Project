"use client";

import { refreshAccessToken } from "@/utils/Auth";
import { useEffect, useState } from "react";

export default function useAuth() {
  const [accessToken, setAccessToken] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchToken() {
      try {
        const userAuth = await refreshAccessToken();
        setAccessToken(userAuth.accessToken);
        setRole(userAuth.role);
      } catch (err) {
        console.log(err);
        setAccessToken(null);
        setRole(null);
      } finally {
        setLoading(false);
      }
    }

    fetchToken();
  }, []);

  const removeAccess = () => {
    setAccessToken(null);
    setRole(null);
  };

  return {
    accessToken,
    setAccessToken,
    role,
    setRole,
    loading,
    removeAccess,
  };
}

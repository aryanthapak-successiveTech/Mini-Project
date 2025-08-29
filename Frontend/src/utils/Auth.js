import { REQUEST_URL } from "./Constant";
export const login = async (email, password) => {
  const res = await fetch(`${REQUEST_URL}/user/login`, {
    method: "POST",
    credentials: "include",
    body: JSON.stringify({ email, password }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("Login Failed");
  }

  const data = await res.json();

  return data;
};

export const refreshAccessToken = async () => {
  const res = await fetch(`${REQUEST_URL}/user/refresh`, {
    method: "GET",
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Could not refresh access token");
  }
  const data = await res.json();

  return { accessToken: data.accessToken, role: data.role };
};

export const logout = async () => {
  await fetch(`${REQUEST_URL}/user/logout`, {
    method: "POST",
    credentials: "include",
  });
};

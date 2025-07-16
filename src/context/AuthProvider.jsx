import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { apiClient } from "../api";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const storedUser = localStorage.getItem("user");
      if (!storedUser) {
        setIsLoading(false);
        return;
      }

      try {
        const parsedUser = JSON.parse(storedUser);
        // Set token in Axios BEFORE making the request
        if (parsedUser.accessToken) {
          apiClient.defaults.headers.common["Authorization"] = `Bearer ${parsedUser.accessToken}`;
        }
        const response = await apiClient.get("/auth/me");
        setUser({ ...response.data, accessToken: parsedUser.accessToken });
      } catch (error) {
        console.error("Failed to fetch user:", error);
        localStorage.removeItem("user");
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  const login = ({ accessToken, user }) => {
    const userData = {
      ...user,
      accessToken,
    };
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    apiClient.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${accessToken}`;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    delete apiClient.defaults.headers.common["Authorization"];
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

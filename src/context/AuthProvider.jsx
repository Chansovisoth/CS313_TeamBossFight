import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { apiClient, setupInterceptors } from "../api";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    delete apiClient.defaults.headers.common["Authorization"];
  };

  // Setup API interceptors (will be called from components that have access to navigate)
  const setupAuth = (navigate) => {
    setupInterceptors({ logout }, navigate);
  };

  useEffect(() => {
    const fetchUser = async () => {
      const storedToken = localStorage.getItem("accessToken");
      const storedUser = localStorage.getItem("user");
      
      if (!storedToken || !storedUser) {
        setIsLoading(false);
        return;
      }

      try {
        // Set token in Axios headers
        apiClient.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;
        
        const response = await apiClient.get("/auth/me");
        const parsedStoredUser = JSON.parse(storedUser);
        setUser({ ...response.data, accessToken: storedToken });
      } catch (error) {
        console.error("Failed to fetch user:", error);
        localStorage.removeItem("user");
        localStorage.removeItem("accessToken");
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
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("user", JSON.stringify(user));
    apiClient.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      setUser, 
      login, 
      logout, 
      isLoading, 
      setupAuth,
      isAuthenticated: !!user
    }}>
      {children}
    </AuthContext.Provider>
  );
};

"use client";

import { apiClient } from "@/lib/api";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phone?: string;
  }) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // ✅ Load user on mount from /auth/me
  useEffect(() => {
    apiClient
      .getCurrentUser()
      .then((res) => {
        if (res.success && res.data) {
          setUser(res.data);
        } else {
          setUser(null);
        }
      })
      .catch(() => {
        apiClient.removeToken?.(); // optional
        setUser(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // ✅ Login
  const login = async (email: string, password: string) => {
    const response = await apiClient.login({ email, password });

    const { token, refreshToken, user } = response.data;

    // Store token if using localStorage
    localStorage.setItem("auth_token", token);
    localStorage.setItem("refresh_token", refreshToken);

    // Optional if using axios instance
    apiClient.setToken?.(token);

    setUser(user);
  };

  // ✅ Register
  const register = async (userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phone?: string;
  }) => {
    const response = await apiClient.register(userData);
    const { token, user } = response.data;

    localStorage.setItem("auth_token", token);
    apiClient.setToken?.(token);
    setUser(user);
  };

  // ✅ Logout
  const logout = async () => {
    try {
      await apiClient.logout?.(); // optional if backend supports it
    } catch (err) {
      console.warn("Logout API failed, clearing local anyway");
    }

    localStorage.removeItem("auth_token");
    localStorage.removeItem("refresh_token");
    apiClient.removeToken?.();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

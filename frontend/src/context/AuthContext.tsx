import React, { createContext, useContext, useEffect, useState } from "react";
import { User, LoginData, RegisterData, AuthResponse } from "../types/auth";
import { BrandSignupData } from "types/brandSignup";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (
    data: LoginData
  ) => Promise<{ data: User | null; error: string | null }>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  isLoggedIn: () => boolean;
  brandSignup: (
    data: BrandSignupData
  ) => Promise<{ id: number; email: string }>;
}

const AuthContext = createContext<AuthContextType | null>(null);

// API endpoints
const API_BASE_URL = "http://localhost:4000/api/auth";
const ENDPOINTS = {
  login: `${API_BASE_URL}/login`,
  register: `${API_BASE_URL}/register`,
  brandSignup: `${API_BASE_URL}/brand-signup`,
} as const;

// API service
const authService = {
  async makeRequest<T>(endpoint: string, data: unknown): Promise<T> {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    return response.json();
  },
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = () => {
      const token = localStorage.getItem("token");
      const savedUser = localStorage.getItem("user");

      if (token && savedUser) {
        try {
          setUser(JSON.parse(savedUser));
        } catch (error) {
          // Invalid user data in localStorage
          localStorage.removeItem("token");
          localStorage.removeItem("user");
        }
      }
      setIsLoading(false);
    };

    initializeAuth();
  }, []);

  const login = async (data: LoginData) => {
    try {
      const auth = await authService.makeRequest<AuthResponse>(
        ENDPOINTS.login,
        data
      );
      localStorage.setItem("token", auth.token as string);
      localStorage.setItem("user", JSON.stringify(auth.user));
      setUser(auth.user);
      return { data: auth.user, error: null };
    } catch (error) {
      return { error: "Invalid credentials", data: null };
    }
  };

  const register = async (data: RegisterData) => {
    try {
      const auth = await authService.makeRequest<AuthResponse>(
        ENDPOINTS.register,
        data
      );
      localStorage.setItem("token", auth.token as string);
      localStorage.setItem("user", JSON.stringify(auth.user));
      setUser(auth.user);
    } catch (error) {
      throw new Error("Registration failed. Please try again.");
    }
  };

  const brandSignup = async (data: BrandSignupData) => {
    try {
      return await authService.makeRequest<{ id: number; email: string }>(
        ENDPOINTS.brandSignup,
        data
      );
    } catch (error) {
      throw new Error("Brand signup failed. Please try again.");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  const isLoggedIn = () => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    return !!token && !!user;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        register,
        logout,
        isLoggedIn,
        brandSignup,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};

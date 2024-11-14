import React, { createContext, useContext, useEffect, useState } from "react";
import { User, LoginData, RegisterData, AuthResponse } from "../types/auth";


interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    login: (data: LoginData) => Promise<void>;
    register: (data: RegisterData) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            // Verify token and get user data
            // This would be an API call to verify the token
            setIsLoading(false);
        } else {
            setIsLoading(false);
        }
    }, []);


    const login = async (data: LoginData) => {
        try {
            const res = await fetch("http://localhost:4000/api/auth/login", {
                method: "POST",
                body: JSON.stringify(data),
                headers: { "Content-Type": "application/json" },
            });

            if (!res.ok) {
                throw new Error("Failed to login");
            }
            const auth: AuthResponse = await res.json();
            localStorage.setItem("token", auth.token as string);
            setUser(auth.user);
        } catch (error) {
            throw error;
        }
    };
    const register = async (data: RegisterData) => {
        try {
            const res = await fetch("http://localhost:4000/api/auth/register", {
                method: "POST",
                body: JSON.stringify(data),
                headers: { "Content-Type": "application/json" },
            })
            if (!res.ok) {
                throw new Error("Failed to Register");
            }
            const auth: AuthResponse = await res.json();
            localStorage.setItem("token", auth.token as string);
            setUser(auth.user);

        } catch (error) {
            throw error;
        }
    };
    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
    };

    return (<AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
        {children}
    </AuthContext.Provider>)
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within an AuthProvider');
    return context;
};
import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { saveToken, clearToken } from "../shared/services/commonService";

export interface User {
    id: number;
    name: string;
    email: string;
    role_id: number;
}

interface AuthContextType {
    user: User | null;
    token: string | null;
    login: (token: string, user: User) => void;
    logout: () => void;
    isAdmin: boolean;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const navigate = useNavigate();

    const logout = () => {
        clearToken();
        localStorage.removeItem("user");
        setToken(null);
        setUser(null);
        navigate("/login");
    };

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        const storedUser = localStorage.getItem("user");
        
        if (storedToken && storedUser) {
            try {
                const decoded: any = jwtDecode(storedToken);
                // Check if token expired
                if (decoded.exp * 1000 < Date.now()) {
                    // Clear expired token but don't navigate yet
                    clearToken();
                    localStorage.removeItem("user");
                } else {
                    setToken(storedToken);
                    setUser(JSON.parse(storedUser));
                }
            } catch (error) {
                // Clear invalid token
                clearToken();
                localStorage.removeItem("user");
            }
        }
    }, []);

    const login = (newToken: string, newUser: User) => {
        saveToken(newToken);
        localStorage.setItem("user", JSON.stringify(newUser));
        setToken(newToken);
        setUser(newUser);
    };

    const isAdmin = user?.role_id === 1;
    const isAuthenticated = !!token;

    return (
        <AuthContext.Provider value={{ user, token, login, logout, isAdmin, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

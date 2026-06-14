import { useState } from "react";
import { api } from "../../../shared/services/commonService";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import type { FormErrors, LoginFormData, RegisterFormData } from "../interface";

export function useAuthLogic() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<FormErrors>({});

    const validateLogin = (data: LoginFormData) => {
        const newErrors: FormErrors = {};
        if (!data.email) newErrors.email = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(data.email)) newErrors.email = "Invalid email format";
        if (!data.password) newErrors.password = "Password is required";
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const validateRegister = (data: RegisterFormData) => {
        const newErrors: FormErrors = {};
        if (!data.name) newErrors.name = "Name is required";
        if (!data.phone) newErrors.phone = "Phone number is required";
        if (!data.email) newErrors.email = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(data.email)) newErrors.email = "Invalid email format";
        if (!data.password) newErrors.password = "Password is required";
        else if (data.password.length < 6) newErrors.password = "Password must be at least 6 characters";
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleLoginSubmit = async (data: LoginFormData) => {
        if (!validateLogin(data)) return;
        
        setLoading(true);
        try {
            const response = await api.post("/auth/login", data);
            login(response.data.token, response.data.user);
            toast.success("Logged in successfully!");
            if (response.data.user.role_id === 1) {
                navigate("/products");
            } else {
                navigate("/products");
            }
        } catch (err: any) {
            toast.error(err.response?.data?.message || "Login failed");
            setErrors({ general: err.response?.data?.message || "Login failed" });
        } finally {
            setLoading(false);
        }
    };

    const handleRegisterSubmit = async (data: RegisterFormData) => {
        if (!validateRegister(data)) return;

        setLoading(true);
        try {
            await api.post("/auth/register", data);
            toast.success("Account created successfully! Please log in.");
            navigate("/login");
        } catch (err: any) {
            toast.error(err.response?.data?.message || "Registration failed");
            setErrors({ general: err.response?.data?.message || "Registration failed" });
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        errors,
        handleLoginSubmit,
        handleRegisterSubmit
    };
}

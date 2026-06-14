import axios from "axios";

const AUTH_TOKEN_KEY = "token";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

export const commonService = axios.create({
    baseURL: API_URL,
});

commonService.interceptors.request.use((config) => {
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

commonService.interceptors.response.use(
    (response) => response,
    (error) => {
        const status = error?.response?.status;
        if (status === 401 || status === 403) {
            clearToken();
            localStorage.removeItem("user");
        }
        return Promise.reject(error);
    }
);

export const saveToken = (token: string) => {
    localStorage.setItem(AUTH_TOKEN_KEY, token);
};

export const clearToken = () => {
    localStorage.removeItem(AUTH_TOKEN_KEY);
};

export const getToken = () => {
    return localStorage.getItem(AUTH_TOKEN_KEY);
};

export { commonService as api };
export const getImageUrl = (path?: string) => path ? (path.startsWith('http') ? path : `${API_BASE_URL}${path}`) : '';

export interface LoginFormData {
    email: string;
    password: string;
}

export interface RegisterFormData {
    name: string;
    email: string;
    phone: string;
    password: string;
    role_id?: number;
}

export interface FormErrors {
    [key: string]: string;
}

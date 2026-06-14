export interface Product {
    id: number;
    title: string;
    description: string;
    rate: number;
    image_url: string;
    category_id: number;
    category?: Category;
}

export interface Category {
    id: number;
    name: string;
    category_name?: string;
    description: string;
}

export interface ProductFormData {
    title: string;
    description: string;
    rate: number;
    category_id: number;
    image?: File | null;
}

export const getCategoryName = (category?: Category) => {
    return category?.name || category?.category_name || "";
};

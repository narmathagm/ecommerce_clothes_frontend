export interface Category {
    id: number;
    name: string;
    category_name?: string;
    description: string;
}

export const getCategoryName = (category?: Category) => {
    return category?.name || category?.category_name || "";
};

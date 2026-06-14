import { api } from "../../shared/services/commonService";
import type { Category } from "./interface";

export const categoryService = {
    async list(): Promise<Category[]> {
        const response = await api.get("/categories");
        return response.data.map((category: Category) => ({
            ...category,
            name: category.name || category.category_name || "",
        }));
    },

    async create(name: string, description: string) {
        return api.post("/categories", { name, description });
    },

    async update(id: number, name: string, description: string) {
        return api.put(`/categories/${id}`, { name, description });
    },

    async remove(id: number) {
        return api.delete(`/categories/${id}`);
    },
};

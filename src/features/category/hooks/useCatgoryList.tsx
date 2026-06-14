import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { categoryService } from "../categoryService";
import type { Category } from "../interface";

export function useCategoryList() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchCategories = useCallback(async () => {
        setLoading(true);
        try {
            setCategories(await categoryService.list());
        } catch (error) {
            toast.error("Failed to fetch categories");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchCategories();
    }, [fetchCategories]);

    const createCategory = async (name: string, description: string) => {
        setLoading(true);
        try {
            await categoryService.create(name, description);
            toast.success("Category created successfully!");
            await fetchCategories();
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Failed to create category");
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const updateCategory = async (id: number, name: string, description: string) => {
        setLoading(true);
        try {
            await categoryService.update(id, name, description);
            toast.success("Category updated successfully!");
            await fetchCategories();
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Failed to update category");
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const deleteCategory = async (id: number) => {
        if (!confirm("Are you sure you want to delete this category?")) return;
        setLoading(true);
        try {
            await categoryService.remove(id);
            toast.success("Category deleted successfully!");
            await fetchCategories();
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Failed to delete category");
        } finally {
            setLoading(false);
        }
    };

    return { categories, loading, createCategory, updateCategory, deleteCategory };
}

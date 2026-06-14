import { useState, useEffect, useCallback } from "react";
import { api } from "../../../shared/services/commonService";
import type { Product, Category, ProductFormData } from "../interface";
import toast from "react-hot-toast";

const normalizeCategory = (category: Category): Category => ({
    ...category,
    name: category.name || category.category_name || "",
});

export function useProducts() {
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchProducts = useCallback(async () => {
        setLoading(true);
        try {
            const res = await api.get("/products");
            setProducts(res.data);
        } catch (error) {
            toast.error("Failed to fetch products");
        } finally {
            setLoading(false);
        }
    }, []);

    const fetchCategories = useCallback(async () => {
        try {
            // Assuming categories endpoint exists or using dummy for now
            const res = await api.get("/categories").catch(() => ({ data: [] }));
            if (res.data.length > 0) {
                setCategories(res.data.map(normalizeCategory));
            } else {
                setCategories([{ id: 1, name: "Clothing", description: "All clothes" }]);
            }
        } catch (error) {
            console.error("Failed to fetch categories");
        }
    }, []);

    useEffect(() => {
        fetchProducts();
        fetchCategories();
    }, [fetchProducts, fetchCategories]);

    const createCategory = async (name: string, description: string) => {
        setLoading(true);
        try {
            await api.post("/categories", { name, description });
            toast.success("Category created successfully!");
            fetchCategories();
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
            await api.put(`/categories/${id}`, { name, description });
            toast.success("Category updated successfully!");
            fetchCategories();
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
            await api.delete(`/categories/${id}`);
            toast.success("Category deleted successfully!");
            fetchCategories();
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Failed to delete category");
        } finally {
            setLoading(false);
        }
    };

    const createProduct = async (data: ProductFormData) => {
        setLoading(true);
        try {
            let imageUrl = "";
            if (data.image) {
                const formData = new FormData();
                formData.append("image", data.image);
                const uploadRes = await api.post("/upload", formData, {
                    headers: { "Content-Type": "multipart/form-data" }
                });
                imageUrl = uploadRes.data.imageUrl;
            }

            const payload: Record<string, string | number> = {
                title: data.title,
                description: data.description,
                rate: data.rate,
                category_id: data.category_id,
            };
            if (imageUrl) payload.image_url = imageUrl;

            await api.post("/products", payload);

            toast.success("Product created successfully!");
            fetchProducts();
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Failed to create product");
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const updateProduct = async (id: number, data: ProductFormData, currentImageUrl: string) => {
        setLoading(true);
        try {
            let imageUrl = currentImageUrl;
            if (data.image) {
                const formData = new FormData();
                formData.append("image", data.image);
                const uploadRes = await api.post("/upload", formData, {
                    headers: { "Content-Type": "multipart/form-data" }
                });
                imageUrl = uploadRes.data.imageUrl;
            }

            const payload: Record<string, string | number> = {
                title: data.title,
                description: data.description,
                rate: data.rate,
                category_id: data.category_id,
            };
            if (imageUrl) payload.image_url = imageUrl;

            await api.put(`/products/${id}`, payload);

            toast.success("Product updated successfully!");
            fetchProducts();
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Failed to update product");
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const deleteProduct = async (id: number) => {
        if (!confirm("Are you sure you want to delete this product?")) return;
        setLoading(true);
        try {
            await api.delete(`/products/${id}`);
            toast.success("Product deleted successfully!");
            fetchProducts();
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Failed to delete product");
        } finally {
            setLoading(false);
        }
    };

    return {
        products,
        categories,
        loading,
        createProduct,
        updateProduct,
        deleteProduct,
        createCategory,
        updateCategory,
        deleteCategory
    };
}

import { useState } from "react";
import type { Category, ProductFormData } from "../interface";
import { getCategoryName } from "../interface";
import { Button } from "../../../shared/ui/button";

interface CreateProductProps {
    categories: Category[];
    onSave: (data: ProductFormData) => Promise<void>;
    onCancel: () => void;
}

export function CreateProduct({ categories, onSave, onCancel }: CreateProductProps) {
    const [formData, setFormData] = useState<ProductFormData>({
        title: "",
        description: "",
        rate: 0,
        category_id: categories.length > 0 ? categories[0].id : 1,
        image: null
    });
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const validate = () => {
        const nextErrors: Record<string, string> = {};
        if (!formData.title.trim()) nextErrors.title = "Title is required";
        if (!formData.description.trim()) nextErrors.description = "Description is required";
        if (!formData.rate || formData.rate <= 0) nextErrors.rate = "Rate is required";
        if (!formData.category_id) nextErrors.category_id = "Category is required";
        setErrors(nextErrors);
        return Object.keys(nextErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;
        setLoading(true);
        try {
            await onSave(formData);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
            <div className="bg-white dark:bg-slate-900 rounded-xl shadow-2xl w-full max-w-md p-6 border border-slate-200 dark:border-slate-800 animate-in zoom-in-95 duration-200">
                <h2 className="text-xl font-bold mb-6 dark:text-white">Add Product</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Title</label>
                        <input type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm dark:bg-slate-800 dark:text-white p-2 border ${errors.title ? "border-red-500 focus:ring-red-500 border-2" : "border-slate-300 focus:border-indigo-500 focus:ring-indigo-500 dark:border-slate-700"}`} />
                        {errors.title && <p className="mt-1.5 text-sm text-red-600 dark:text-red-400">{errors.title}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Description</label>
                        <textarea value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm dark:bg-slate-800 dark:text-white p-2 border ${errors.description ? "border-red-500 focus:ring-red-500 border-2" : "border-slate-300 focus:border-indigo-500 focus:ring-indigo-500 dark:border-slate-700"}`} rows={3} />
                        {errors.description && <p className="mt-1.5 text-sm text-red-600 dark:text-red-400">{errors.description}</p>}
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Rate ($)</label>
                            <input type="number" step="0.01" value={formData.rate || ''} onChange={e => setFormData({...formData, rate: parseFloat(e.target.value) || 0})} className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm dark:bg-slate-800 dark:text-white p-2 border ${errors.rate ? "border-red-500 focus:ring-red-500 border-2" : "border-slate-300 focus:border-indigo-500 focus:ring-indigo-500 dark:border-slate-700"}`} />
                            {errors.rate && <p className="mt-1.5 text-sm text-red-600 dark:text-red-400">{errors.rate}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Category</label>
                            <select value={formData.category_id} onChange={e => setFormData({...formData, category_id: parseInt(e.target.value)})} className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm dark:bg-slate-800 dark:text-white p-2 border ${errors.category_id ? "border-red-500 focus:ring-red-500 border-2" : "border-slate-300 focus:border-indigo-500 focus:ring-indigo-500 dark:border-slate-700"}`}>
                                {categories.map(category => (
                                    <option key={category.id} value={category.id}>{getCategoryName(category)}</option>
                                ))}
                            </select>
                            {errors.category_id && <p className="mt-1.5 text-sm text-red-600 dark:text-red-400">{errors.category_id}</p>}
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Image (optional)</label>
                        <input type="file" accept="image/*" onChange={e => setFormData({...formData, image: e.target.files?.[0] || null})} className="mt-1 block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 dark:file:bg-indigo-900/30 dark:file:text-indigo-400" />
                    </div>
                    
                    <div className="mt-6 flex justify-end space-x-3">
                        <Button type="button" variant="ghost" onClick={onCancel}>Cancel</Button>
                        <Button type="submit" disabled={loading}>{loading ? 'Saving...' : 'Save Product'}</Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

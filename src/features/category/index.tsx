import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "../../shared/ui/button";
import { CategoryList } from "./components/categoryList";
import { CreateCategory } from "./components/createCategory";
import { UpdateCategory } from "./components/UpdateCategory";
import { useCategoryList } from "./hooks/useCatgoryList";
import type { Category } from "./interface";

export function CategoriesView() {
    const { categories, loading, createCategory, updateCategory, deleteCategory } = useCategoryList();
    const [showCreateCategory, setShowCreateCategory] = useState(false);
    const [updateCat, setUpdateCat] = useState<Category | null>(null);

    return (
        <div className="w-full px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-500">
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">Categories</h1>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Create and manage product categories.</p>
                </div>
                <Button onClick={() => setShowCreateCategory(true)} className="gap-2">
                    <Plus className="h-4 w-4" />
                    New Category
                </Button>
            </div>

            {loading && categories.length === 0 ? (
                <div className="flex min-h-[40vh] items-center justify-center">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
                </div>
            ) : (
                <CategoryList categories={categories} onEdit={setUpdateCat} />
            )}

            {showCreateCategory && <CreateCategory onSave={async (name, desc) => { await createCategory(name, desc); setShowCreateCategory(false); }} onCancel={() => setShowCreateCategory(false)} />}
            {updateCat && <UpdateCategory category={updateCat} onSave={async (id, name, desc) => { await updateCategory(id, name, desc); setUpdateCat(null); }} onDelete={async (id) => { await deleteCategory(id); setUpdateCat(null); }} onCancel={() => setUpdateCat(null)} />}
        </div>
    );
}

export * from "./interface";

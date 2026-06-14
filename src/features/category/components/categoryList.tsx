import { Edit } from "lucide-react";
import { Button } from "../../../shared/ui/button";
import type { Category } from "../interface";
import { getCategoryName } from "../interface";

interface CategoryListProps {
    categories: Category[];
    onEdit: (category: Category) => void;
}

export function CategoryList({ categories, onEdit }: CategoryListProps) {
    if (categories.length === 0) {
        return (
            <div className="text-center py-20 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-dashed border-slate-300 dark:border-slate-800">
                <h3 className="text-xl font-semibold dark:text-white mb-2">No categories found</h3>
                <p className="text-slate-500">Add a category to get started.</p>
            </div>
        );
    }

    return (
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="divide-y divide-slate-200 dark:divide-slate-800">
                {categories.map((category) => (
                    <div key={category.id} className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h2 className="font-semibold text-slate-900 dark:text-white">{getCategoryName(category)}</h2>
                            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{category.description || "No description"}</p>
                        </div>
                        <Button type="button" variant="secondary" onClick={() => onEdit(category)} className="gap-2 self-start sm:self-auto">
                            <Edit className="h-4 w-4" />
                            Edit
                        </Button>
                    </div>
                ))}
            </div>
        </div>
    );
}

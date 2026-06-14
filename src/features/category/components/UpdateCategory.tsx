import { useState } from "react";
import { Button } from "../../../shared/ui/button";
import { Modal } from "../../../shared/ui/modals";
import type { Category } from "../interface";
import { getCategoryName } from "../interface";

interface UpdateCategoryProps {
    category: Category;
    onSave: (id: number, name: string, description: string) => Promise<void>;
    onDelete: (id: number) => Promise<void>;
    onCancel: () => void;
}

export function UpdateCategory({ category, onSave, onDelete, onCancel }: UpdateCategoryProps) {
    const [name, setName] = useState(getCategoryName(category));
    const [description, setDescription] = useState(category.description);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const validate = () => {
        const nextErrors: Record<string, string> = {};
        if (!name.trim()) nextErrors.name = "Category name is required";
        if (!description.trim()) nextErrors.description = "Description is required";
        setErrors(nextErrors);
        return Object.keys(nextErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;
        setLoading(true);
        try {
            await onSave(category.id, name, description);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal isOpen={true} onClose={onCancel} title="Update Category">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1 dark:text-slate-300">Category Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className={`w-full bg-transparent rounded-lg p-2 dark:text-white outline-none ${errors.name ? "border-red-500 focus:ring-red-500 border-2" : "border dark:border-slate-700 focus:ring-2 focus:ring-indigo-500"}`}
                    />
                    {errors.name && <p className="mt-1.5 text-sm text-red-600 dark:text-red-400">{errors.name}</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1 dark:text-slate-300">Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className={`w-full bg-transparent rounded-lg p-2 dark:text-white outline-none ${errors.description ? "border-red-500 focus:ring-red-500 border-2" : "border dark:border-slate-700 focus:ring-2 focus:ring-indigo-500"}`}
                        rows={3}
                    />
                    {errors.description && <p className="mt-1.5 text-sm text-red-600 dark:text-red-400">{errors.description}</p>}
                </div>
                <div className="flex justify-between pt-4">
                    <Button type="button" variant="destructive" onClick={() => onDelete(category.id)}>Delete</Button>
                    <div className="flex gap-2">
                        <Button type="button" variant="ghost" onClick={onCancel}>Cancel</Button>
                        <Button type="submit" disabled={loading}>
                            {loading ? "Saving..." : "Save Changes"}
                        </Button>
                    </div>
                </div>
            </form>
        </Modal>
    );
}

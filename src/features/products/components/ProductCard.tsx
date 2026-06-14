import { useAuth } from "../../../context/AuthContext";
import type { Product } from "../interface";
import { Button } from "../../../shared/ui/button";
import { Edit, ShoppingCart, Trash2 } from "lucide-react";
import { getImageUrl } from "../../../shared/services/commonService";

interface ProductCardProps {
    product: Product;
    categoryName?: string;
    onAddToCart?: (productId: number) => void;
    onEdit?: (product: Product) => void;
    onDelete?: (productId: number) => void;
}

export function ProductCard({ product, categoryName, onAddToCart, onEdit, onDelete }: ProductCardProps) {
    const { isAdmin, isAuthenticated } = useAuth();

    return (
        <div className="group relative flex flex-col overflow-hidden rounded-xl bg-white dark:bg-slate-900 shadow-md hover:shadow-xl transition-all duration-300 border border-slate-100 dark:border-slate-800">
            <div className="w-full overflow-y-auto overflow-x-hidden bg-slate-100 dark:bg-slate-800 h-72 relative">
                <img
                    src={getImageUrl(product.image_url) || "https://via.placeholder.com/300x400?text=No+Image"}
                    alt={product.title}
                    className="block h-auto min-h-full w-full object-top"
                />
            </div>
            <div className="flex flex-1 flex-col justify-between p-4">
                <div>
                    {categoryName && (
                        <p className="mb-1 text-xs font-semibold uppercase text-indigo-600 dark:text-indigo-400">
                            {categoryName}
                        </p>
                    )}
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 line-clamp-1">
                        {product.title}
                    </h3>
                    <p className="mt-1 min-h-10 text-sm text-slate-500 dark:text-slate-400 line-clamp-2">
                        {product.description || "No description available."}
                    </p>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400 font-medium">
                        ${Number(product.rate).toFixed(2)}
                    </p>
                </div>
                {isAuthenticated && !isAdmin && onAddToCart && (
                    <div className="mt-4">
                        <Button 
                            onClick={() => onAddToCart(product.id)} 
                            className="w-full flex items-center justify-center gap-2 group-hover:bg-indigo-700 transition-colors"
                        >
                            <ShoppingCart className="h-4 w-4" />
                            Add to Cart
                        </Button>
                    </div>
                )}
                {isAdmin && (
                    <div className="mt-4 grid grid-cols-2 gap-2">
                        {onEdit && (
                            <Button type="button" variant="secondary" onClick={() => onEdit(product)} className="gap-2">
                                <Edit className="h-4 w-4" />
                                Edit
                            </Button>
                        )}
                        {onDelete && (
                            <Button type="button" variant="destructive" onClick={() => onDelete(product.id)} className="gap-2">
                                <Trash2 className="h-4 w-4" />
                                Delete
                            </Button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

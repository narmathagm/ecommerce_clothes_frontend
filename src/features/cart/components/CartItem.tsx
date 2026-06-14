import type { CartItemType } from "../interface";
import { Button } from "../../../shared/ui/button";
import { Minus, Plus, Trash2 } from "lucide-react";
import { getImageUrl } from "../../../shared/services/commonService";

interface CartItemProps {
    item: CartItemType;
    onUpdateQuantity: (id: number, quantity: number) => void;
    onRemove: (id: number) => void;
}

export function CartItem({ item, onUpdateQuantity, onRemove }: CartItemProps) {
    const categoryName = item.product?.category?.name || item.product?.category?.category_name;

    return (
        <li className="flex flex-col sm:flex-row py-6 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors rounded-xl px-4">
            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-slate-200 dark:border-slate-700">
                <img
                    src={getImageUrl(item.product?.image_url) || "https://via.placeholder.com/150"}
                    alt={item.product?.title}
                    className="h-full w-full object-cover object-center"
                />
            </div>

            <div className="mt-4 sm:mt-0 sm:ml-4 flex flex-1 flex-col">
                <div>
                    <div className="flex justify-between text-base font-medium text-slate-900 dark:text-slate-100">
                        <h3>{item.product?.title}</h3>
                        <p className="ml-4">${(item.unit_price * item.quantity).toFixed(2)}</p>
                    </div>
                    {categoryName && (
                        <p className="mt-1 text-xs font-semibold uppercase text-indigo-600 dark:text-indigo-400">{categoryName}</p>
                    )}
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400 line-clamp-2">
                        {item.product?.description || "No description available."}
                    </p>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">${item.unit_price} each</p>
                </div>
                <div className="flex flex-1 items-end justify-between text-sm mt-4 sm:mt-0">
                    <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded-md bg-white dark:bg-slate-950">
                        <button 
                            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                            className="p-1.5 text-slate-500 hover:text-indigo-600 disabled:opacity-50"
                        >
                            <Minus className="h-4 w-4" />
                        </button>
                        <span className="w-8 text-center font-medium dark:text-white">{item.quantity}</span>
                        <button 
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                            className="p-1.5 text-slate-500 hover:text-indigo-600"
                        >
                            <Plus className="h-4 w-4" />
                        </button>
                    </div>

                    <div className="flex">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onRemove(item.id)}
                            className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950"
                        >
                            <Trash2 className="h-4 w-4 mr-1" /> Remove
                        </Button>
                    </div>
                </div>
            </div>
        </li>
    );
}

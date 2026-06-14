import type { CartItemType } from "../interface";
import { CartItem } from "./CartItem";

interface CartListProps {
    items: CartItemType[];
    onUpdateQuantity: (id: number, quantity: number) => void;
    onRemove: (id: number) => void;
}

export function CartList({ items, onUpdateQuantity, onRemove }: CartListProps) {
    if (items.length === 0) {
        return <div className="text-center py-12 text-slate-500">Your cart is empty</div>;
    }

    return (
        <ul className="divide-y divide-slate-200 dark:divide-slate-800">
            {items.map((item) => (
                <CartItem 
                    key={item.id} 
                    item={item} 
                    onUpdateQuantity={onUpdateQuantity}
                    onRemove={onRemove}
                />
            ))}
        </ul>
    );
}

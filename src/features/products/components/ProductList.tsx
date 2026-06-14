import { ProductCard } from "./ProductCard";
import type { Category, Product } from "../interface";
import { getCategoryName } from "../interface";
import { useCart } from "../../../context/CartContext";
import { useAuth } from "../../../context/AuthContext";

interface ProductListProps {
    products: Product[];
    categories?: Category[];
    onEdit?: (product: Product) => void;
    onDelete?: (productId: number) => void;
}

export function ProductList({ products, categories = [], onEdit, onDelete }: ProductListProps) {
    const { addToCart } = useCart();
    const { isAdmin } = useAuth();

    const handleAddToCart = (productId: number) => {
        addToCart(productId, 1);
    };

    if (products.length === 0) {
        return (
            <div className="text-center py-12 text-slate-500">
                <p className="text-xl">No products found.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
            {products.map((product) => (
                <ProductCard 
                    key={product.id} 
                    product={product} 
                    categoryName={getCategoryName(categories.find((category) => category.id === product.category_id))}
                    onAddToCart={isAdmin ? undefined : handleAddToCart}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            ))}
        </div>
    );
}

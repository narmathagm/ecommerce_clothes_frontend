import { createContext, useContext, useState, useEffect, useCallback } from "react";
import type { ReactNode } from "react";
import { api } from "../shared/services/commonService";
import { useAuth } from "./AuthContext";
import toast from "react-hot-toast";

export interface Product {
    id: number;
    title: string;
    description: string;
    rate: number;
    image_url: string;
    category_id: number;
    category?: {
        id: number;
        name: string;
        category_name?: string;
        description: string;
    };
}

export interface CartItem {
    id: number;
    cart_id: number;
    product_id: number;
    quantity: number;
    unit_price: number;
    product?: Product;
}

interface CartContextType {
    cartItems: CartItem[];
    loading: boolean;
    addToCart: (productId: number, quantity: number) => Promise<void>;
    updateQuantity: (itemId: number, quantity: number) => Promise<void>;
    removeFromCart: (itemId: number) => Promise<void>;
    fetchCart: () => Promise<void>;
    cartTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [loading, setLoading] = useState(false);
    const { isAuthenticated, user } = useAuth();

    const fetchCart = useCallback(async () => {
        if (!isAuthenticated || user?.role_id === 1) { // Admins usually don't use carts, but guard anyway
            setCartItems([]);
            return;
        }
        setLoading(true);
        try {
            const response = await api.get("/cart");
            setCartItems(response.data.items || []);
        } catch (error) {
            console.error("Failed to fetch cart", error);
        } finally {
            setLoading(false);
        }
    }, [isAuthenticated, user]);

    useEffect(() => {
        fetchCart();
    }, [fetchCart]);

    const addToCart = async (productId: number, quantity: number) => {
        try {
            await api.post("/cart/items", { product_id: productId, quantity });
            await fetchCart();
            toast.success("Added to cart");
        } catch (error) {
            console.error("Failed to add to cart", error);
            toast.error("Failed to add to cart");
        }
    };

    const updateQuantity = async (itemId: number, quantity: number) => {
        if (quantity <= 0) {
            await removeFromCart(itemId);
            return;
        }
        try {
            setCartItems((items) => items.map((item) => item.id === itemId ? { ...item, quantity } : item));
            await api.put(`/cart/items/${itemId}`, { quantity });
            await fetchCart();
        } catch (error) {
            console.error("Failed to update cart item", error);
            toast.error("Failed to update cart");
            await fetchCart();
        }
    };

    const removeFromCart = async (itemId: number) => {
        const previousItems = cartItems;
        setCartItems((items) => items.filter((item) => item.id !== itemId));
        try {
            await api.delete(`/cart/items/${itemId}`);
            await fetchCart();
            toast.success("Item removed from cart");
        } catch (error) {
            setCartItems(previousItems);
            console.error("Failed to remove cart item", error);
            toast.error("Failed to remove item");
        }
    };

    const cartTotal = cartItems.reduce((total, item) => total + (item.quantity * item.unit_price), 0);

    return (
        <CartContext.Provider value={{ cartItems, loading, addToCart, updateQuantity, removeFromCart, fetchCart, cartTotal }}>
            {children}
        </CartContext.Provider>
    );
}

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
};

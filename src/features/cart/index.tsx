import { Link } from "react-router-dom";
import { CartList } from "./components/CartList";
import { Button } from "../../shared/ui/button";
import { ShoppingBag, ArrowLeft } from "lucide-react";
import { MobileResponsive } from "./components/mobileResponsive";
import { TabResponsive } from "./components/tabResponsive";
import { useCart } from "../../context/CartContext";

export function CartView() {
    const { cartItems, loading, updateQuantity, removeFromCart, cartTotal } = useCart();

    if (loading && cartItems.length === 0) {
        return <div className="flex h-[60vh] items-center justify-center">Loading cart...</div>;
    }

    const Content = () => {
        if (cartItems.length === 0) {
            return (
                <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6">
                    <div className="bg-slate-100 dark:bg-slate-800 p-6 rounded-full">
                        <ShoppingBag className="w-16 h-16 text-slate-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Your cart is empty</h2>
                    <p className="text-slate-500 dark:text-slate-400 max-w-md text-center">
                        Looks like you haven't added anything to your cart yet. Browse our products to find something you like.
                    </p>
                    <Link to="/products">
                        <Button className="mt-4 gap-2">
                            <ArrowLeft className="w-4 h-4" /> Continue Shopping
                        </Button>
                    </Link>
                </div>
            );
        }

        return (
            <div className="max-w-4xl mx-auto py-8 animate-in fade-in duration-500">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">Shopping Cart</h1>
                    <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
                        {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}
                    </span>
                </div>

                <div className="bg-white dark:bg-slate-900 shadow-sm border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden mb-8">
                    <CartList items={cartItems} onUpdateQuantity={updateQuantity} onRemove={removeFromCart} />
                </div>

                <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-6 border border-slate-200 dark:border-slate-800">
                    <div className="flex justify-between text-lg font-medium text-slate-900 dark:text-white mb-4">
                        <p>Subtotal</p>
                        <p>${cartTotal.toFixed(2)}</p>
                    </div>
                    <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400 mb-6">
                        Shipping and taxes calculated at checkout.
                    </p>
                    <div className="mt-6">
                        <Button className="w-full text-lg h-12">
                            Proceed to Checkout
                        </Button>
                    </div>
                    <div className="mt-6 flex justify-center text-center text-sm text-slate-500 dark:text-slate-400">
                        <p>
                            or{' '}
                            <Link to="/products" className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 hover:underline">
                                Continue Shopping
                                <span aria-hidden="true"> &rarr;</span>
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <>
            <MobileResponsive>
                <div className="w-full px-4">
                    <Content />
                </div>
            </MobileResponsive>
            <TabResponsive>
                <div className="w-full px-6">
                    <Content />
                </div>
            </TabResponsive>
        </>
    );
}

export * from "./interface";

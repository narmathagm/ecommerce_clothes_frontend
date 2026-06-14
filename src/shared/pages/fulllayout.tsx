import { Outlet, Link, NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import { useCart } from "../../context/CartContext";
import { Button } from "../ui/button";
import { ShoppingBag, LogOut, User, Moon, Sun, Monitor, Store } from "lucide-react";

export function FullLayout() {
    const { isAuthenticated, user, logout, isAdmin } = useAuth();
    const { theme, setTheme } = useTheme();
    const { cartItems } = useCart();

    const cartItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    const navLinkClass = ({ isActive }: { isActive: boolean }) =>
        `px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
            isActive
                ? "bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300"
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
        }`;

    return (
        <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-50 transition-colors duration-300">
            <header className="sticky top-0 z-40 w-full backdrop-blur-lg bg-white/75 dark:bg-slate-900/75 border-b border-slate-200 dark:border-slate-800 shadow-sm">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-2 text-xl font-extrabold tracking-tight text-indigo-600 dark:text-indigo-400">
                        <Store className="h-6 w-6" />
                        <span>StyleStore</span>
                    </Link>

                    {isAuthenticated && (
                        <nav className="hidden md:flex items-center gap-2">
                            <NavLink to="/products" className={navLinkClass}>Products</NavLink>
                            {isAdmin && <NavLink to="/categories" className={navLinkClass}>Categories</NavLink>}
                        </nav>
                    )}

                    <div className="flex items-center gap-4">
                        <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-full items-center gap-1">
                            <button onClick={() => setTheme("light")} className={`p-1.5 rounded-full ${theme === "light" ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500 hover:text-slate-900"}`}>
                                <Sun className="h-4 w-4" />
                            </button>
                            <button onClick={() => setTheme("dark")} className={`p-1.5 rounded-full ${theme === "dark" ? "bg-slate-700 text-indigo-400 shadow-sm" : "text-slate-500 hover:text-slate-300"}`}>
                                <Moon className="h-4 w-4" />
                            </button>
                            <button onClick={() => setTheme("system")} className={`p-1.5 rounded-full ${theme === "system" ? "bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-sm" : "text-slate-500"}`}>
                                <Monitor className="h-4 w-4" />
                            </button>
                        </div>

                        {isAuthenticated ? (
                            <>
                                {!isAdmin && (
                                    <Link to="/cart" className="relative group">
                                        <Button variant="ghost" size="icon" className="relative overflow-visible">
                                            <ShoppingBag className="h-5 w-5" />
                                            {cartItemCount > 0 && (
                                                <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center animate-in zoom-in">
                                                    {cartItemCount}
                                                </span>
                                            )}
                                        </Button>
                                    </Link>
                                )}
                                
                                <div className="hidden sm:flex items-center gap-2 pl-4 border-l border-slate-200 dark:border-slate-700">
                                    <div className="flex flex-col items-end mr-2">
                                        <span className="text-sm font-semibold">{user?.name}</span>
                                        <span className="text-xs text-slate-500">{isAdmin ? 'Admin' : 'Customer'}</span>
                                    </div>
                                    <div className="h-8 w-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-indigo-700 dark:text-indigo-300 font-bold border border-indigo-200 dark:border-indigo-800">
                                        {user?.name?.charAt(0).toUpperCase() || <User className="h-4 w-4" />}
                                    </div>
                                    <Button variant="ghost" size="sm" onClick={logout} className="text-red-500 hover:text-red-700 hover:bg-red-50 ml-2">
                                        <LogOut className="h-4 w-4" />
                                    </Button>
                                </div>
                            </>
                        ) : (
                            <div className="flex items-center gap-2">
                                <Link to="/login">
                                    <Button variant="ghost">Sign In</Button>
                                </Link>
                                <Link to="/register">
                                    <Button>Sign Up</Button>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </header>

            {isAuthenticated && (
                <nav className="md:hidden flex items-center gap-2 px-4 py-3 border-b border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70">
                    <NavLink to="/products" className={navLinkClass}>Products</NavLink>
                    {isAdmin && <NavLink to="/categories" className={navLinkClass}>Categories</NavLink>}
                </nav>
            )}

            <div className="flex-1 container mx-auto">
                <main className="w-full">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

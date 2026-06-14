import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { FullLayout } from "./shared/pages/fulllayout";
import { Login, Register } from "./features/auth";
import { ProductsView } from "./features/products";
import { CategoriesView } from "./features/category";
import { CartView } from "./features/cart";
import { Toaster } from "react-hot-toast";

function ProtectedRoute({ children, adminOnly = false }: { children: ReactNode, adminOnly?: boolean }) {
    const { isAuthenticated, isAdmin } = useAuth();
    
    if (!isAuthenticated) return <Navigate to="/login" replace />;
    if (adminOnly && !isAdmin) return <Navigate to="/" replace />;
    
    return <>{children}</>;
}

export default function App() {
    return (
        <Router>
            <ThemeProvider defaultTheme="system">
                <Toaster position="top-right" toastOptions={{ className: 'dark:bg-slate-800 dark:text-white' }} />
                <AuthProvider>
                    <CartProvider>
                        <Routes>
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                            
                            <Route element={<FullLayout />}>
                                <Route path="/" element={
                                    <ProtectedRoute>
                                        <Navigate to="/products" replace />
                                    </ProtectedRoute>
                                } />
                                <Route path="/products" element={
                                    <ProtectedRoute>
                                        <ProductsView />
                                    </ProtectedRoute>
                                } />
                                <Route path="/categories" element={
                                    <ProtectedRoute adminOnly={true}>
                                        <CategoriesView />
                                    </ProtectedRoute>
                                } />
                                <Route path="/cart" element={
                                    <ProtectedRoute>
                                        <CartView />
                                    </ProtectedRoute>
                                } />
                                <Route path="/admin" element={
                                    <ProtectedRoute adminOnly={true}>
                                        <Navigate to="/products" replace />
                                    </ProtectedRoute>
                                } />
                            </Route>
                        </Routes>
                    </CartProvider>
                </AuthProvider>
            </ThemeProvider>
        </Router>
    );
}

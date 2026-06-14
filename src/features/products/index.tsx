import { useState } from "react";
import { useProducts } from "./hooks/useProducts";
import { ProductList } from "./components/ProductList";
import { CreateProduct } from "./components/createProduct";
import { UpdateProduct } from "./components/UpdateProduct";
import type { Product } from "./interface";
import { getCategoryName } from "./interface";
import { useAuth } from "../../context/AuthContext";
import { Button } from "../../shared/ui/button";
import { Plus, Search } from "lucide-react";

export function ProductsView() {
    const { products, categories, loading, createProduct, updateProduct, deleteProduct } = useProducts();
    const { isAdmin } = useAuth();
    const [activeCategory, setActiveCategory] = useState<number | null>(null);
    const [search, setSearch] = useState("");
    const [showCreateProduct, setShowCreateProduct] = useState(false);
    const [updateProd, setUpdateProd] = useState<Product | null>(null);

    const filteredProducts = products.filter((product) => {
        const matchesCategory = activeCategory ? product.category_id === activeCategory : true;
        const query = search.trim().toLowerCase();
        const matchesSearch = query
            ? product.title.toLowerCase().includes(query) || product.description?.toLowerCase().includes(query)
            : true;
        return matchesCategory && matchesSearch;
    });

    if (loading && products.length === 0) {
        return <div className="flex min-h-[60vh] items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>;
    }

    return (
        <div className="w-full px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-500">
            <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                <div>
                    <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                        {activeCategory ? getCategoryName(categories.find(c => c.id === activeCategory)) : "Products"}
                    </h1>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                        {isAdmin ? "Manage the product list." : "Browse products and add your favorites to the cart."}
                    </p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                    <div className="relative min-w-0 sm:w-72">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                        <input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search products"
                            className="w-full rounded-lg border border-slate-300 bg-white py-2.5 pl-9 pr-3 text-sm shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                        />
                    </div>
                    <select
                        value={activeCategory ?? ""}
                        onChange={(e) => setActiveCategory(e.target.value ? Number(e.target.value) : null)}
                        className="rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                    >
                        <option value="">All categories</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>{getCategoryName(category)}</option>
                        ))}
                    </select>
                    {isAdmin && (
                        <Button
                            onClick={() => setShowCreateProduct(true)}
                            className="gap-2"
                        >
                            <Plus className="h-4 w-4" />
                            New Product
                        </Button>
                    )}
                </div>
            </div>
                    
            {products.length === 0 && !loading ? (
                <div className="text-center py-20 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-dashed border-slate-300 dark:border-slate-800">
                    <h3 className="text-xl font-semibold dark:text-white mb-2">No products found</h3>
                    <p className="text-slate-500">{isAdmin ? "Add a product to get started." : "Please check back later."}</p>
                </div>
            ) : (
                <ProductList products={filteredProducts} categories={categories} onEdit={isAdmin ? setUpdateProd : undefined} onDelete={isAdmin ? deleteProduct : undefined} />
            )}

            {showCreateProduct && <CreateProduct categories={categories} onSave={async (data) => { await createProduct(data); setShowCreateProduct(false); }} onCancel={() => setShowCreateProduct(false)} />}
            {updateProd && <UpdateProduct categories={categories} product={updateProd} onSave={async (id, data, currentImage) => { await updateProduct(id, data, currentImage); setUpdateProd(null); }} onCancel={() => setUpdateProd(null)} />}
        </div>
    );
}

export * from "./interface";

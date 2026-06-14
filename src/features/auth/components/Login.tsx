import { useState } from "react";
import { useAuthLogic } from "../hooks/useAuthLogic";
import { Link } from "react-router-dom";
import { Button } from "../../../shared/ui/button";
import { Store, Mail, Lock, Shield } from "lucide-react";
import type { LoginFormData } from "../interface";

export function Login() {
    const { loading, errors, handleLoginSubmit } = useAuthLogic();
    const [formData, setFormData] = useState<LoginFormData>({ email: "", password: "" });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleLoginSubmit(formData);
    };

    return (
        <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950">
            {/* Left side - Image/Branding */}
            <div className="hidden lg:flex lg:w-1/2 relative bg-indigo-900 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/90 via-purple-900/80 to-slate-900/90 z-10" />
                <img 
                    src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop" 
                    alt="Clothing fashion model" 
                    className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="relative z-20 flex flex-col justify-center px-12 h-full text-white">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="p-3 bg-white/10 rounded-xl backdrop-blur-md border border-white/20">
                            <Store className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-3xl font-extrabold tracking-tight">StyleStore</h1>
                    </div>
                    <h2 className="text-5xl font-bold leading-tight mb-6 tracking-tight">Welcome<br/>Back</h2>
                    <p className="text-indigo-100 text-lg max-w-md font-light">Sign in to access your curated collections, track your recent orders, and unlock member-only styles.</p>
                </div>
            </div>

            {/* Right side - Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12">
                <div className="w-full max-w-md space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <div className="text-center lg:text-left">
                        <div className="lg:hidden flex items-center justify-center gap-3 mb-8">
                            <div className="p-2 bg-indigo-100 dark:bg-indigo-900/50 rounded-xl">
                                <Store className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                            </div>
                            <h1 className="text-2xl font-extrabold tracking-tight dark:text-white">StyleStore</h1>
                        </div>
                        <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Sign in</h2>
                        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                            New to StyleStore?{' '}
                            <Link to="/register" className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 transition-colors">
                                Create an account
                            </Link>
                        </p>
                    </div>

                    <form className="mt-8 space-y-6" onSubmit={onSubmit}>
                        {errors.general && (
                            <div className="rounded-lg bg-red-50 p-4 dark:bg-red-900/30 text-sm text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800 flex items-center gap-2">
                                <Shield className="w-4 h-4 flex-shrink-0" />
                                {errors.general}
                            </div>
                        )}
                        
                        <div className="space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Email Address</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Mail className="h-5 w-5 text-slate-400" />
                                    </div>
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="you@example.com"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className={`pl-10 block w-full rounded-lg bg-white dark:bg-slate-900 shadow-sm sm:text-sm p-3.5 transition-colors ${errors.email ? 'border-red-500 focus:ring-red-500 border-2' : 'border border-slate-300 dark:border-slate-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500'}`}
                                    />
                                </div>
                                {errors.email && <p className="mt-1.5 text-sm text-red-600 dark:text-red-400">{errors.email}</p>}
                            </div>

                            <div>
                                <div className="flex items-center justify-between mb-1.5">
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Password</label>
                                    <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400">
                                        Forgot password?
                                    </a>
                                </div>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Lock className="h-5 w-5 text-slate-400" />
                                    </div>
                                    <input
                                        type="password"
                                        name="password"
                                        placeholder="••••••••"
                                        value={formData.password}
                                        onChange={handleChange}
                                        className={`pl-10 block w-full rounded-lg bg-white dark:bg-slate-900 shadow-sm sm:text-sm p-3.5 transition-colors ${errors.password ? 'border-red-500 focus:ring-red-500 border-2' : 'border border-slate-300 dark:border-slate-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500'}`}
                                    />
                                </div>
                                {errors.password && <p className="mt-1.5 text-sm text-red-600 dark:text-red-400">{errors.password}</p>}
                            </div>
                        </div>

                        <Button type="submit" className="w-full h-12 text-lg font-bold tracking-wide mt-8 rounded-xl shadow-lg shadow-indigo-600/20" disabled={loading}>
                            {loading ? "Signing in..." : "Sign In"}
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
}

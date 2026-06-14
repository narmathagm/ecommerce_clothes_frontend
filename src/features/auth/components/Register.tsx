import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../../../shared/ui/button";
import { useAuthLogic } from "../hooks/useAuthLogic";
import type { RegisterFormData } from "../interface";
import { Store, User, Mail, Phone, Lock, Shield } from "lucide-react";

export function Register() {
    const { loading, errors, handleRegisterSubmit } = useAuthLogic();
    const [formData, setFormData] = useState<RegisterFormData>({ 
        name: "", 
        email: "", 
        phone: "", 
        password: "",
        role_id: 2 // Default to customer
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const value = e.target.name === 'role_id' ? parseInt(e.target.value) : e.target.value;
        setFormData({ ...formData, [e.target.name]: value });
    };

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleRegisterSubmit(formData);
    };

    return (
        <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950">
            {/* Left side - Image/Branding */}
            <div className="hidden lg:flex lg:w-1/2 relative bg-indigo-900 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/90 to-purple-900/90 z-10" />
                <img 
                    src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=2070&auto=format&fit=crop" 
                    alt="Clothing store rack" 
                    className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="relative z-20 flex flex-col justify-center px-12 h-full text-white">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="p-3 bg-white/20 rounded-xl backdrop-blur-md">
                            <Store className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-3xl font-extrabold tracking-tight">StyleStore</h1>
                    </div>
                    <h2 className="text-4xl font-bold leading-tight mb-6">Discover Your Next<br/>Signature Look</h2>
                    <p className="text-indigo-100 text-lg max-w-md">Join thousands of trendsetters and get access to exclusive drops, personalized recommendations, and member-only pricing.</p>
                </div>
            </div>

            {/* Right side - Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12">
                <div className="w-full max-w-md space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <div className="text-center lg:text-left">
                        <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Create an account</h2>
                        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                            Already a member?{' '}
                            <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 transition-colors">
                                Sign in here
                            </Link>
                        </p>
                    </div>

                    <form className="mt-8 space-y-5" onSubmit={onSubmit}>
                        {errors.general && (
                            <div className="rounded-lg bg-red-50 p-4 dark:bg-red-900/30 text-sm text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800 flex items-center gap-2">
                                <Shield className="w-4 h-4 flex-shrink-0" />
                                {errors.general}
                            </div>
                        )}
                        
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Full Name</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <User className="h-5 w-5 text-slate-400" />
                                    </div>
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="John Doe"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className={`pl-10 block w-full rounded-lg bg-white dark:bg-slate-900 shadow-sm sm:text-sm p-3 transition-colors ${errors.name ? 'border-red-500 focus:ring-red-500 border-2' : 'border border-slate-300 dark:border-slate-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500'}`}
                                    />
                                </div>
                                {errors.name && <p className="mt-1.5 text-sm text-red-600 dark:text-red-400">{errors.name}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Email Address</label>
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
                                        className={`pl-10 block w-full rounded-lg bg-white dark:bg-slate-900 shadow-sm sm:text-sm p-3 transition-colors ${errors.email ? 'border-red-500 focus:ring-red-500 border-2' : 'border border-slate-300 dark:border-slate-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500'}`}
                                    />
                                </div>
                                {errors.email && <p className="mt-1.5 text-sm text-red-600 dark:text-red-400">{errors.email}</p>}
                            </div>

                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Phone</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Phone className="h-5 w-5 text-slate-400" />
                                        </div>
                                        <input
                                            type="text"
                                            name="phone"
                                            placeholder="+1 (555) 000-0000"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className={`pl-10 block w-full rounded-lg bg-white dark:bg-slate-900 shadow-sm sm:text-sm p-3 transition-colors ${errors.phone ? 'border-red-500 focus:ring-red-500 border-2' : 'border border-slate-300 dark:border-slate-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500'}`}
                                        />
                                    </div>
                                    {errors.phone && <p className="mt-1.5 text-sm text-red-600 dark:text-red-400">{errors.phone}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Role (Demo)</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Shield className="h-5 w-5 text-slate-400" />
                                        </div>
                                        <select
                                            name="role_id"
                                            value={formData.role_id}
                                            onChange={handleChange}
                                            className="pl-10 block w-full rounded-lg bg-white dark:bg-slate-900 shadow-sm sm:text-sm p-3 border border-slate-300 dark:border-slate-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                                        >
                                            <option value={2}>Customer</option>
                                            <option value={1}>Administrator</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Password</label>
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
                                        className={`pl-10 block w-full rounded-lg bg-white dark:bg-slate-900 shadow-sm sm:text-sm p-3 transition-colors ${errors.password ? 'border-red-500 focus:ring-red-500 border-2' : 'border border-slate-300 dark:border-slate-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500'}`}
                                    />
                                </div>
                                {errors.password && <p className="mt-1.5 text-sm text-red-600 dark:text-red-400">{errors.password}</p>}
                            </div>
                        </div>

                        <Button type="submit" className="w-full h-12 text-lg font-bold tracking-wide mt-6 rounded-xl" disabled={loading}>
                            {loading ? "Creating account..." : "Join StyleStore"}
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
}

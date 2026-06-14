import * as React from "react"
import { cn } from "../../lib/utils"
import { X } from "lucide-react"

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
    className?: string;
}

export function Modal({ isOpen, onClose, title, children, className }: ModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
            <div className={cn("bg-white dark:bg-slate-900 rounded-xl shadow-2xl w-full max-w-md p-6 border border-slate-200 dark:border-slate-800 animate-in zoom-in-95 duration-200 relative", className)}>
                <button 
                    onClick={onClose}
                    className="absolute top-4 right-4 p-1 rounded-full text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                    <X className="w-5 h-5" />
                </button>
                {title && <h2 className="text-xl font-bold mb-6 dark:text-white pr-8">{title}</h2>}
                <div>{children}</div>
            </div>
        </div>
    );
}

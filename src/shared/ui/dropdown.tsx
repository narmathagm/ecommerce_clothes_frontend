import * as React from "react"

export function Dropdown({ children, trigger, isOpen, onToggle }: { children: React.ReactNode, trigger: React.ReactNode, isOpen: boolean, onToggle: () => void }) {
    return (
        <div className="relative">
            <div onClick={onToggle} className="cursor-pointer">
                {trigger}
            </div>
            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-slate-800 ring-1 ring-black ring-opacity-5 z-50 animate-in fade-in zoom-in-95 duration-100 border border-slate-200 dark:border-slate-700">
                    <div className="py-1">
                        {children}
                    </div>
                </div>
            )}
        </div>
    )
}

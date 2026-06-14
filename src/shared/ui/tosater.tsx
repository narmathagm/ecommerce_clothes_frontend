import { Toaster as HotToaster } from "react-hot-toast";

export function Toaster() {
    return (
        <HotToaster 
            position="top-right" 
            toastOptions={{ 
                className: 'dark:bg-slate-800 dark:text-white border dark:border-slate-700 shadow-xl',
                success: {
                    iconTheme: {
                        primary: '#4f46e5',
                        secondary: 'white',
                    },
                },
            }} 
        />
    );
}

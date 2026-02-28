import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertCircle, X, Info } from 'lucide-react';

type ToastType = 'success' | 'error' | 'info';

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  addToast: (message: string, type?: ToastType) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const addToast = useCallback((message: string, type: ToastType = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
      removeToast(id);
    }, 5000);
  }, [removeToast]);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <div className="fixed bottom-8 right-8 z-[100] flex flex-col gap-3">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: 50, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
              className={`
                min-w-[320px] p-4 rounded-2xl border backdrop-blur-xl shadow-2xl flex items-center gap-4
                ${toast.type === 'success' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 
                  toast.type === 'error' ? 'bg-red-500/10 border-red-500/20 text-red-400' : 
                  'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'}
              `}
            >
              <div className="flex-shrink-0">
                {toast.type === 'success' && <CheckCircle size={24} />}
                {toast.type === 'error' && <AlertCircle size={24} />}
                {toast.type === 'info' && <Info size={24} />}
              </div>
              <p className="flex-1 text-sm font-medium text-white/90 leading-tight">
                {toast.message}
              </p>
              <button 
                onClick={() => removeToast(toast.id)}
                className="p-1 hover:bg-white/10 rounded-lg transition-colors opacity-60 hover:opacity-100"
              >
                <X size={16} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};

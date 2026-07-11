import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertCircle, X, Info } from 'lucide-react';

type ToastType = 'success' | 'error' | 'info';
interface Toast { id: string; message: string; type: ToastType; }
interface ToastContextType { addToast: (msg: string, type?: ToastType) => void; removeToast: (id: string) => void; }

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within a ToastProvider');
  return ctx;
};

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const addToast = useCallback((message: string, type: ToastType = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => removeToast(id), 5000);
  }, [removeToast]);

  const styles: Record<ToastType, { wrap: string; icon: string }> = {
    success: { wrap: 'bg-canvas border-border shadow-card',       icon: 'text-accent' },
    error:   { wrap: 'bg-canvas border-red-300/40 shadow-card',   icon: 'text-red-600' },
    info:    { wrap: 'bg-canvas border-border shadow-card',       icon: 'text-ink-3' },
  };

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-2.5">
        <AnimatePresence>
          {toasts.map(toast => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 10, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.15 } }}
              transition={{ duration: 0.22 }}
              className={`min-w-[300px] px-4 py-3.5 rounded-xl border flex items-center gap-3 ${styles[toast.type].wrap}`}
            >
              <div className={`flex-shrink-0 ${styles[toast.type].icon}`}>
                {toast.type === 'success' && <CheckCircle size={18} />}
                {toast.type === 'error'   && <AlertCircle size={18} />}
                {toast.type === 'info'    && <Info size={18} />}
              </div>
              <p className="flex-1 text-sm text-ink leading-tight">{toast.message}</p>
              <button
                onClick={() => removeToast(toast.id)}
                className="p-1 rounded-md hover:bg-surface-2 transition-colors text-ink-4 hover:text-ink"
                aria-label="Dismiss"
              >
                <X size={14} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};

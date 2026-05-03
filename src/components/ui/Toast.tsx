'use client';

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { Check, Copy, Share2, X } from 'lucide-react';

interface Toast {
  id: number;
  message: string;
  type: 'success' | 'info' | 'error';
  icon?: ReactNode;
}

interface ToastContextType {
  showToast: (message: string, type?: Toast['type'], icon?: ReactNode) => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback(
    (message: string, type: Toast['type'] = 'success', icon?: ReactNode) => {
      const id = Date.now();
      setToasts((prev) => [...prev, { id, message, type, icon }]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 3500);
    },
    []
  );

  const removeToast = (id: number) =>
    setToasts((prev) => prev.filter((t) => t.id !== id));

  const colorMap: Record<Toast['type'], string> = {
    success: '#4E8C66',
    info: '#D4A853',
    error: '#C84535',
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {/* Toast Container */}
      <div className="fixed bottom-6 right-6 z-[9997] flex flex-col gap-3 pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="flex items-center gap-3 px-5 py-3 pointer-events-auto"
            style={{
              background: 'rgba(26, 20, 8, 0.95)',
              backdropFilter: 'blur(20px)',
              border: `1px solid ${colorMap[toast.type]}40`,
              boxShadow: `0 0 20px ${colorMap[toast.type]}20`,
              animation: 'slideInRight 0.3s ease',
            }}
          >
            <span style={{ color: colorMap[toast.type] }}>
              {toast.icon || <Check size={16} />}
            </span>
            <span
              className="text-[#F2E8D5] text-sm"
              style={{ fontFamily: "'Courier New', monospace", letterSpacing: '0.05em' }}
            >
              {toast.message}
            </span>
            <button
              onClick={() => removeToast(toast.id)}
              className="ml-2 text-[#A08B6E] hover:text-[#F2E8D5] transition-colors"
            >
              <X size={12} />
            </button>
          </div>
        ))}
      </div>
      <style>{`
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(40px); }
          to   { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
}

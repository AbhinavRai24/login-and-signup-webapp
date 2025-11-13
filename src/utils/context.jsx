import React, { useState, createContext, useContext, useMemo, useCallback } from 'react';

// --- ICONS (Inline SVG for self-contained file) ---
const XIcon = (props) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>);
const CheckIcon = (props) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>);
const InfoIcon = (props) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" /></svg>);

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const notify = useCallback((message, type = 'success') => {
    const id = Date.now();
    const newToast = { id, message, type };
    setToasts((prev) => [...prev, newToast]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 4000);
  }, []);

  const value = useMemo(() => ({ notify }), [notify]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      {/* Toast Render Area */}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`
              p-4 rounded-xl shadow-lg flex items-center gap-3
              min-w-[300px] transition-all duration-300 transform
              ${toast.type === 'success' ? 'bg-green-100 border-green-400 text-green-700' : ''}
              ${toast.type === 'error' ? 'bg-red-100 border-red-400 text-red-700' : ''}
              ${toast.type === 'info' ? 'bg-blue-100 border-blue-400 text-blue-700' : ''}
            `}
            style={{ animation: 'slideIn 0.3s forwards' }}
          >
            {toast.type === 'success' && <CheckIcon className="w-5 h-5" />}
            {toast.type === 'error' && <XIcon className="w-5 h-5" />}
            {toast.type === 'info' && <InfoIcon className="w-5 h-5" />}
            <span className="font-medium text-sm">{toast.message}</span>
            <button
              onClick={() => setToasts((prev) => prev.filter((t) => t.id !== toast.id))}
              className="ml-auto text-gray-500 hover:text-gray-700"
            >
              <XIcon className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
      <style>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(100%); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </ToastContext.Provider>
  );
};
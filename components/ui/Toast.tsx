"use client";

import { createContext, useContext, useCallback, useState } from "react";

interface Toast {
  id: string;
  message: string;
}

interface ToastCtx {
  showToast: (msg: string) => void;
}

const Ctx = createContext<ToastCtx>({ showToast: () => {} });

export function useToast() {
  return useContext(Ctx);
}

export function ToastProvider() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string) => {
    const id = Math.random().toString(36).slice(2);
    setToasts((t) => [...t, { id, message }]);
    setTimeout(() => {
      setToasts((t) => t.filter((x) => x.id !== id));
    }, 2800);
  }, []);

  return (
    <Ctx.Provider value={{ showToast }}>
      <div className="toast-container">
        {toasts.map((t) => (
          <div key={t.id} className="toast">
            <div className="toast-dot" />
            {t.message}
          </div>
        ))}
      </div>
    </Ctx.Provider>
  );
}

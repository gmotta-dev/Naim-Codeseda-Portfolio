"use client";

import { useEffect, useState } from "react";

import { TToast } from "./types";

export default function useToastStates() {
  const [toasts, setToasts] = useState<TToast[]>([]);

  const addToast = (newToast?: TToast) => {
    if (!newToast) return;

    const lastToastId = toasts[toasts.length - 1]?.id;

    setToasts((prevToasts) => [...prevToasts, { ...newToast, id: lastToastId ? lastToastId + 1 : 1 }]);
  };

  const removeToast = (id: number) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast?.id !== id));
  };

  useEffect(() => {
    const timers = toasts.map((toast) => {
      if (toast) {
        return setTimeout(() => removeToast(toast.id!), toast.time || 7000);
      }
    });

    return () => timers.forEach((timer) => timer && clearTimeout(timer));
  }, [toasts]);

  return { toasts, addToast, removeToast };
}

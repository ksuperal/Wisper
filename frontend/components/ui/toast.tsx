"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

export interface ToastProps {
  message: string;
  variant?: "default" | "success" | "error";
  duration?: number;
  onClose?: () => void;
  className?: string;
}

export function Toast({
  message,
  variant = "default",
  duration = 2500,
  onClose,
  className,
}: ToastProps) {
  const [isVisible, setIsVisible] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => {
        onClose?.();
      }, 200); // Wait for fade out animation
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose?.();
    }, 200);
  };

  return (
    <div
      className={cn(
        "fixed top-4 left-1/2 -translate-x-1/2 z-50 max-w-[300px] w-[calc(100%-2rem)]",
        "bg-raised border border-border rounded-[10px] p-3 pr-10 shadow-lg",
        "transition-all duration-200",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2",
        variant === "success" && "border-l-[3px] border-l-signal",
        variant === "error" && "border-l-[3px] border-l-danger",
        className
      )}
      style={{ paddingTop: "max(12px, env(safe-area-inset-top))" }}
    >
      {/* Message */}
      <p className="text-sm text-text-1">{message}</p>

      {/* Close button */}
      <button
        onClick={handleClose}
        className="absolute top-3 right-3 p-1 text-text-3 hover:text-text-1 transition-colors"
        aria-label="Close"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}

// Toast container for managing multiple toasts
export interface ToastContainerProps {
  toasts: Array<{ id: string } & ToastProps>;
  onRemove: (id: string) => void;
}

export function ToastContainer({ toasts, onRemove }: ToastContainerProps) {
  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      <div className="flex flex-col gap-2">
        {toasts.map((toast) => (
          <div key={toast.id} className="pointer-events-auto">
            <Toast {...toast} onClose={() => onRemove(toast.id)} />
          </div>
        ))}
      </div>
    </div>
  );
}

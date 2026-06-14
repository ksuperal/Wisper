import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "icon" | "mic";
  fullWidth?: boolean;
  isRecording?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      fullWidth = false,
      isRecording = false,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <button
        className={cn(
          // Base styles
          "inline-flex items-center justify-center font-medium transition-all duration-75",
          "focus-visible:outline-none focus-visible:outline-2 focus-visible:outline-signal focus-visible:outline-offset-2",
          "disabled:pointer-events-none",
          "active:scale-[0.98]",

          // Variant styles
          {
            // Primary Button (Signal)
            "bg-signal text-[#001A12] h-[52px] rounded-xl px-6 hover:bg-[#00CC8F] disabled:bg-raised disabled:text-[#444444]":
              variant === "primary",

            // Secondary Button (Ghost)
            "bg-transparent border border-border text-text-2 h-[52px] rounded-xl px-6 hover:bg-raised disabled:opacity-50":
              variant === "secondary",

            // Danger Button (Walk Away)
            "bg-transparent border border-danger text-danger h-11 rounded-[10px] px-6 hover:bg-danger-bg disabled:opacity-50":
              variant === "danger",

            // Icon Button
            "w-11 h-11 bg-raised border border-border rounded-[10px] hover:bg-[#222] hover:border-muted disabled:opacity-50":
              variant === "icon",

            // Mic Button (special circular button)
            "w-14 h-14 bg-raised border rounded-full disabled:opacity-50":
              variant === "mic",
          },

          // Mic recording state
          variant === "mic" && isRecording && "border-2 border-danger",

          // Full width option
          fullWidth && "w-full",

          className
        )}
        ref={ref}
        disabled={disabled}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };

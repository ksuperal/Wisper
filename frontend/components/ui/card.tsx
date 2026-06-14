import * as React from "react";
import { cn } from "@/lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "standard" | "raised" | "signal" | "danger" | "stat";
  signalAccent?: boolean;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    { className, variant = "standard", signalAccent = false, children, ...props },
    ref
  ) => {
    return (
      <div
        className={cn(
          // Base styles
          "rounded-xl p-4 relative",

          // Variant styles
          {
            // Standard Card
            "bg-surface border border-border": variant === "standard",

            // Raised Card (slightly lighter)
            "bg-raised border border-border": variant === "raised",

            // Signal Card (move output - most important)
            "bg-signal-bg border border-signal-dim": variant === "signal",

            // Danger Card (walk away / warning)
            "bg-danger-bg border border-danger": variant === "danger",

            // Stat Card (metric)
            "bg-surface border border-border rounded-xl p-3.5":
              variant === "stat",
          },

          className
        )}
        ref={ref}
        {...props}
      >
        {/* Signal accent - left border */}
        {signalAccent && (
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-signal rounded-l-xl" />
        )}
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("text-lg font-medium tracking-tight text-text-1", className)}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-text-3", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("", className)} {...props} />
));
CardContent.displayName = "CardContent";

export { Card, CardHeader, CardTitle, CardDescription, CardContent };

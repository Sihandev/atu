import { cn } from "@/lib/utils";
import React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "ink" | "glass" | "outline" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", type = "button", ...props }, ref) => {
    const variants: Record<NonNullable<ButtonProps["variant"]>, string> = {
      default: "u-btn u-btn-primary",
      ink: "u-btn u-btn-ink",
      glass: "u-btn u-btn-glass",
      outline:
        "u-btn rounded-full border border-outline/30 bg-white text-on-surface hover:border-secondary hover:text-secondary",
      ghost: "u-btn rounded-full text-on-surface-variant hover:bg-surface-container",
      link: "text-secondary underline-offset-4 hover:underline",
    };

    const sizes: Record<NonNullable<ButtonProps["size"]>, string> = {
      default: "h-12 px-6",
      sm: "h-10 px-5 text-sm",
      lg: "h-14 px-8 text-lg",
      icon: "h-11 w-11 px-0",
    };

    return (
      <button
        ref={ref}
        type={type}
        className={cn(
          "focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
          variants[variant],
          variant !== "link" && sizes[size],
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };

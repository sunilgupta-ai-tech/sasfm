import React, { forwardRef } from "react";

const VARIANTS = {
  primary: "bg-ink text-paper hover:bg-teal disabled:hover:bg-ink",
  secondary: "border border-line bg-paper text-ink hover:bg-paper-dim",
  danger: "border border-red-200 bg-paper text-red-600 hover:bg-red-50",
  ghost: "text-slate hover:text-ink hover:bg-paper-dim",
};

const SIZES = {
  sm: "px-3.5 py-2 text-xs",
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3 text-sm",
};

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: keyof typeof VARIANTS;
  size?: keyof typeof SIZES;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { variant = "primary", size = "md", className = "", ...props },
    ref
  ) => (
    <button
      ref={ref}
      className={`inline-flex items-center justify-center gap-2 rounded-md font-semibold transition-colors disabled:opacity-60 disabled:cursor-not-allowed ${VARIANTS[variant]} ${SIZES[size]} ${className}`}
      {...props}
    />
  )
);

Button.displayName = "Button";
import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "solid" | "outline";
  size?: "xs" | "sm" | "md" | "lg";
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  type?: "button" | "submit" | "reset";
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "solid",
  size = "md",
  onClick,
  disabled = false,
  className = "",
  type = "button",
}) => {
  const baseStyles =
    "border-4 border-[#005655] rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const variantStyles = {
    solid:
      "bg-[#005655] text-white hover:bg-eco-green/90 focus:ring-eco-green/50",
    outline:
      "border-2 border-eco-green text-eco-green bg-transparent hover:bg-eco-green hover:text-white focus:ring-eco-green/50",
  };

  const sizeStyles = {
    xs: "px-6 py-2 text-xs",
    sm: "px-12 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={combinedClassName}
    >
      {children}
    </button>
  );
};

export default Button;

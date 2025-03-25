import { type JSX } from "react";

export interface ButtonProps {
  variant:
    | "primary"
    | "secondary"
    | "disabled"
    | "loading"
    | "selected"
    | "notSelected";
  title: string;
  startIcon?: any;
  endIcon?: any;
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
  fullWidth?: boolean;
  loading?: boolean;
}

// Styles for button
const variantStyles = {
  primary: "bg-purple-600 text-white",
  secondary: "bg-purple-200 text-purple-600",
  disabled: "bg-gray-300 text-gray-500 cursor-not-allowed",
  loading: "bg-purple-600 text-white cursor-not-allowed",
  selected: "bg-pink-600 text-white",
  notSelected: "bg-gray-300 text-gray-500 ",
};
const defaultStyles =
  "flex items-center justify-center gap-2 px-4 py-2 rounded-md font-medium text-md";
const sizeStyles = {
  sm: "py-1 px-2 rounded-sm text-sm",
  md: "py-2 px-4 rounded-md text-base",
  lg: "py-4 px-6 rounded-lg text-lg",
};

export const Button = ({
  variant,
  title,
  startIcon,
  endIcon,
  size,
  onClick,
  fullWidth,
  loading,
}: ButtonProps): JSX.Element => {
  console.log("Button is here");

  return (
    <button
      onClick={onClick}
      className={`${variantStyles[variant]} ${defaultStyles} ${
        size ? sizeStyles[size] : ""
      } ${fullWidth ? "w-full" : ""} ${
        loading ? "opacity-50 cursor-not-allowed" : ""
      }`}>
      {startIcon ? startIcon : null}
      {loading ? "Loading..." : title}
      {endIcon ? endIcon : null}
    </button>
  );
};

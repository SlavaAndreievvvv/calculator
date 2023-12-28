"use client";

import { forwardRef, ButtonHTMLAttributes, ReactNode } from "react";
import clsx from "clsx";
import { FaPlus, FaMinus } from "react-icons/fa"; // Import icons
import styles from "./Button.module.css";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary";
  icon?: "minus" | "plus";
  size?: "small" | "medium";
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      children,
      type,
      variant = "primary",
      icon,
      size = "medium",
      disabled,
      ...rest
    },
    ref
  ) => {
    const ClassName = clsx(
      styles.button,
      styles[variant],
      styles[size],
      { [styles.icon]: icon },
      { [styles.disabled]: disabled },

      className
    );

    const renderIconVariant = icon === "minus" ? <FaMinus /> : <FaPlus />;

    const renderContent = (): ReactNode => {
      return (
        <>
          {icon && renderIconVariant}
          {!icon && children && <span>{children}</span>}
        </>
      );
    };
    return (
      <button type={type} className={ClassName} {...rest} ref={ref}>
        {renderContent()}
      </button>
    );
  }
);

Button.displayName = "Button";

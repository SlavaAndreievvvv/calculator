"use client";
import { forwardRef, HTMLProps } from "react";
import styles from "./Input.module.css";
import clsx from "clsx";

export interface InputProps extends HTMLProps<HTMLInputElement> {
  label?: string;
  htmlFor?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, htmlFor, ...rest }, ref) => {
    return (
      <div className={clsx(styles.container, className)}>
        {label && (
          <label className={styles.label} htmlFor={htmlFor}>
            {label}
          </label>
        )}
        <input className={styles.input} {...rest} ref={ref} />
      </div>
    );
  }
);

Input.displayName = "Input";

"use client";
import { forwardRef, HTMLProps } from "react";
import styles from "./Input.module.css";
import clsx from "clsx";

export interface InputProps extends HTMLProps<HTMLInputElement> {
  label?: string;
  htmlFor?: string;
  errorMessage?: string | null;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, htmlFor, errorMessage, ...rest }, ref) => {
    return (
      <div className={clsx(styles.container, className)}>
        {label && (
          <label className={styles.label} htmlFor={htmlFor}>
            {label}
          </label>
        )}
        <input className={styles.input} {...rest} ref={ref} />
        {errorMessage && (
          <div className={styles.errorMessage}>{errorMessage}</div>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

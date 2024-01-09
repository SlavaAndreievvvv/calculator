"use client";
import { forwardRef, HTMLProps } from "react";
import { motion } from "framer-motion";
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
          <motion.div
            className={styles.errorMessage}
            initial={{ opacity: 0, y: -3 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            {errorMessage}
          </motion.div>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

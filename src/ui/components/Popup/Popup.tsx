"use client";

import clsx from "clsx";
import styles from "./Popup.module.css";
import { ReactNode, forwardRef, Ref } from "react";

export interface PopupProps {
  className?: string;
  children: ReactNode;
  isOpen?: boolean;
}

export const Popup = forwardRef(
  (
    { className, children, isOpen = false }: PopupProps,
    ref: Ref<HTMLDivElement>
  ) => {
    return isOpen ? (
      <div className={clsx(styles.container, className)}>
        <span ref={ref} className={styles.card}>
          {children}
        </span>
      </div>
    ) : null;
  }
);

Popup.displayName = "Popup";

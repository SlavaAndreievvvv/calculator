"use client";

import clsx from "clsx";
import { ReactNode, forwardRef, Ref } from "react";
import styles from "./Popup.module.css";

export interface PopupProps {
  className?: string;
  children: ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
}

export const Popup = forwardRef(
  (
    { className, children, isOpen = false, onClose }: PopupProps,
    ref: Ref<HTMLDivElement>
  ) => {
    return isOpen ? (
      <div className={clsx(styles.container, className)}>
        <div ref={ref} className={styles.card}>
          {children}
          {onClose && (
            <button onClick={onClose} className={styles.close}>
              {`спробувати >`}
            </button>
          )}
        </div>
      </div>
    ) : null;
  }
);

Popup.displayName = "Popup";

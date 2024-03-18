"use client";

import clsx from "clsx";
import { motion } from "framer-motion";
import { ReactNode, forwardRef, Ref } from "react";
import styles from "./Popup.module.css";

export interface PopupProps {
  className?: string;
  cardClassName?: string;
  children: ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
}

export const Popup = forwardRef(
  (
    { className, cardClassName, children, isOpen = false, onClose }: PopupProps,
    ref: Ref<HTMLDivElement>
  ) => {
    return isOpen ? (
      <div className={clsx(styles.container, className)}>
        <motion.div
          ref={ref}
          className={clsx(styles.card, cardClassName)}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.div>
      </div>
    ) : null;
  }
);

Popup.displayName = "Popup";

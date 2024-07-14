"use client";

import clsx from "clsx";
import { motion } from "framer-motion";
import { ReactNode, forwardRef, Ref, useEffect } from "react";
import styles from "./Popup.module.css";

export interface PopupProps {
  className?: string;
  cardClassName?: string;
  children: ReactNode;
  isOpen?: boolean;
}

export const Popup = forwardRef(
  (
    { className, cardClassName, children, isOpen = false }: PopupProps,
    ref: Ref<HTMLDivElement>
  ) => {
    useEffect(() => {
      if (isOpen) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "visible";
      }
      return () => {
        document.body.style.overflow = "visible";
      };
    }, [isOpen]);

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
    ) : (
      <></>
    );
  }
);

Popup.displayName = "Popup";

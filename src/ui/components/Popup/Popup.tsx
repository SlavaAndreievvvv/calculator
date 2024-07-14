"use client";

import clsx from "clsx";
import { motion } from "framer-motion";
import { ReactNode, useEffect, useRef, Dispatch, SetStateAction } from "react";
import { Icon } from "../Icon";
import { useOnClickOutside } from "usehooks-ts";
import styles from "./Popup.module.css";

export interface PopupProps {
  className?: string;
  cardClassName?: string;
  children: ReactNode;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  isOpen: boolean;
}

export const Popup = ({
  className,
  cardClassName,
  children,
  setIsOpen,
  isOpen,
}: PopupProps) => {
  const popupRef = useRef(null);
  useOnClickOutside(popupRef, () => setIsOpen(false));

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

  const handleClose = () => {
    setIsOpen(false);
  };

  return isOpen ? (
    <div className={clsx(styles.container, className)}>
      <motion.div
        ref={popupRef}
        className={clsx(styles.card, cardClassName)}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        {children}
        <button onClick={handleClose} className={styles.close}>
          <Icon id="close" className={styles.icon} />
        </button>
      </motion.div>
    </div>
  ) : (
    <></>
  );
};

Popup.displayName = "Popup";

import React from "react";
import { ChangeEvent } from "react";
import { motion } from "framer-motion";
import { Input } from "@/ui/components";
import styles from "./FriendInput.module.css";

export interface FriendInputProps {
  index: number;
  name: string;
  value: string;
  nameError: string;
  valueError: string;
  nameDirties: boolean;
  valueDirties: boolean;
  onBlur: (e: ChangeEvent<HTMLInputElement>, index: number) => void;
  onNameChange: (e: ChangeEvent<HTMLInputElement>, index: number) => void;
  onValueChange: (e: ChangeEvent<HTMLInputElement>, index: number) => void;
}

export const FriendInput = ({
  index,
  name,
  value,
  nameError,
  valueError,
  nameDirties,
  valueDirties,
  onBlur,
  onNameChange,
  onValueChange,
}: FriendInputProps) => (
  <motion.li
    className={styles.item}
    key={index}
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
  >
    <Input
      htmlFor={`name${index + 1}`}
      placeholder="Ім'я друга"
      name={`name${index + 1}`}
      id={`name${index + 1}`}
      value={name}
      onChange={(e: ChangeEvent<HTMLInputElement>) => onNameChange(e, index)}
      onBlur={(e) => onBlur(e, index)}
      errorMessage={nameDirties ? nameError : null}
      className={styles.input}
    />
    <Input
      htmlFor={`value${index + 1}`}
      placeholder="Витрати"
      name={`value${index + 1}`}
      id={`value${index + 1}`}
      value={value}
      onChange={(e: ChangeEvent<HTMLInputElement>) => onValueChange(e, index)}
      onBlur={(e) => onBlur(e, index)}
      errorMessage={valueDirties ? valueError : null}
      inputMode="numeric"
      className={styles.input}
    />
  </motion.li>
);

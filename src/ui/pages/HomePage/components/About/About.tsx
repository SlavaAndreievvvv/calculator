"use client";

import clsx from "clsx";
import styles from "./About.module.css";

export interface AboutProps {
  className?: string;
}

export const About = ({ className }: AboutProps) => {
  return (
    <div className={clsx(styles.container, className)}>
      <h2 className={styles.title}>
        Вітаємо вас у додатку для розподілу витрат між друзями!
      </h2>
      <div className={styles.content}>
        <h3 className={styles.subtitle}>🎉 Принцип роботи дуже простий:</h3>
        <ul className={styles.listRule}>
          <li className={styles.rule}>
            Додайте імена своїх друзів та вкажіть, скільки грошей кожен витратив
            під час вашої події.
          </li>
          <li className={styles.rule}>
            {` Натискайте кнопку "Розподілити витрати", і наш додаток автоматично
                розрахує, скільки кожен повинен додати або повернути, щоб витрати були
                розподілені порівну.`}
          </li>
          <li className={styles.rule}>
            Ви отримаєте сповіщення з рекомендаціями для кожного учасника. Так
            просто!
          </li>
        </ul>

        <div className={styles.wish}>
          Гарного вам використання нашого додатку та насолоджуйтеся часом з
          друзями без турбот про гроші! 🤗
        </div>
      </div>
    </div>
  );
};

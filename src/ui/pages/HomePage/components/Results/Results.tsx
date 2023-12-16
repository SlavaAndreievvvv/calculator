import clxs from "clsx";
import styles from "./Results.module.css";

export interface ResultsProps {
  className?: string;
  results: string[];
}

export const Results = ({ results, className }: ResultsProps) => {
  return (
    <div className={clxs(styles.container, className)}>
      <h3 className={styles.title}>Результати розподілу:</h3>
      {results.map((result, index) => (
        <p className={styles.text} key={index}>{`Друг ${
          index + 1
        }: ${result}`}</p>
      ))}
    </div>
  );
};

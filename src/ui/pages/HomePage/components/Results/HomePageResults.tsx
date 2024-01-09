import clxs from "clsx";
import styles from "./HomePageResults.module.css";

export interface HomePageResultsProps {
  className?: string;
  results: string[];
}

export const HomePageResults = ({
  results,
  className,
}: HomePageResultsProps) => {
  return (
    <div className={clxs(styles.container, className)}>
      <h3 className={styles.title}>Результати розподілу</h3>
      {results.map((result, index) => (
        <div
          className={styles.text}
          key={index}
          dangerouslySetInnerHTML={{ __html: result }}
        />
      ))}
    </div>
  );
};

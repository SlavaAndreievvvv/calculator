"use client";

import { ChangeEvent, useState } from "react";
import { Button, Input } from "@/ui/components";
import styles from "./HomePage.module.css";
import { NumberOfFriends, Results } from "./components";

export const HomePage = () => {
  const [numberOfFriends, setNumberOfFriends] = useState<number>(2);
  const [friendValues, setFriendValues] = useState<string[]>(["", ""]);
  const [results, setResults] = useState<string[]>([]);

  const calculateShares = () => {
    const totalExpense = friendValues.reduce(
      (acc, value) => acc + parseFloat(value) || 0,
      0
    );

    const averageExpense = totalExpense / numberOfFriends;

    const newResults = friendValues.map((value) => {
      let difference;
      if (parseFloat(value) > averageExpense) {
        difference = parseFloat(value) - averageExpense;
        return `Повернути ${Math.round(difference)} грн`;
      }
      difference = averageExpense - parseFloat(value);
      return `Докласти ${Math.round(difference)} грн`;
    });

    setResults(newResults);
  };

  return (
    <section className={styles.container}>
      <div className={styles.wrapper}>
        <NumberOfFriends
          handleAddFriend={() => setNumberOfFriends((prev) => prev + 1)}
          handleRemoveFriend={() => setNumberOfFriends((prev) => prev - 1)}
          numberOfFriends={numberOfFriends}
        />
        <div className={styles.friendsList}>
          {[...Array(numberOfFriends)].map((_, index) => (
            <Input
              key={index}
              htmlFor={`friendValue${index + 1}`}
              label={`Друг ${index + 1}`}
              name={`friendValue${index + 1}`}
              id={`friendValue${index + 1}`}
              value={friendValues[index]}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                const newValues = [...friendValues];
                newValues[index] = e.target.value;
                setFriendValues(newValues);
              }}
            />
          ))}
        </div>
        <Button className={styles.button} onClick={calculateShares}>
          Розподілити витрати
        </Button>
        <Results results={results} />
      </div>
    </section>
  );
};

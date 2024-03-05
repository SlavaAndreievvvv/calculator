import clsx from "clsx";
import { Button } from "@/ui/components";
import styles from "./HomePageNumberOfFriends.module.css";

export interface HomePageNumberOfFriendsProps {
  className?: string;
  handleRemoveFriend: () => void;
  handleAddFriend: () => void;
  numberOfFriends: number;
}

export const HomePageNumberOfFriends = ({
  handleRemoveFriend,
  handleAddFriend,
  numberOfFriends,
  className,
}: HomePageNumberOfFriendsProps) => {
  return (
    <div className={clsx(styles.container, className)}>
      <span className={styles.mobileText}>
        Кількість друзів: {numberOfFriends}
      </span>

      <Button
        type="button"
        icon="minus"
        onClick={handleRemoveFriend}
        disabled={numberOfFriends <= 3}
        className={styles.button}
      />

      <span className={styles.text}>Кількість друзів: {numberOfFriends}</span>
      <Button
        type="button"
        icon="plus"
        onClick={handleAddFriend}
        className={styles.button}
      />
    </div>
  );
};

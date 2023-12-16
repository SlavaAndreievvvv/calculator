import clxs from "clsx";
import styles from "./NumberOfFriends.module.css";
import { Button } from "@/ui/components";

export interface NumberOfFriendsProps {
  handleRemoveFriend: () => void;
  handleAddFriend: () => void;
  numberOfFriends: number;
}

export const NumberOfFriends = ({
  handleRemoveFriend,
  handleAddFriend,
  numberOfFriends,
}: NumberOfFriendsProps) => {
  return (
    <div className={styles.container}>
      <Button
        icon="minus"
        onClick={handleRemoveFriend}
        disabled={numberOfFriends <= 2}
      />

      <span className={styles.text}>Кількість друзів: {numberOfFriends}</span>
      <Button icon="plus" onClick={handleAddFriend} />
    </div>
  );
};

"use client";

import { ChangeEvent, useEffect, useRef, useState } from "react";
import { Button, Input, Popup } from "@/ui/components";
import { About, NumberOfFriends, Results } from "./components";
import { useOnClickOutside } from "usehooks-ts";
import styles from "./HomePage.module.css";

interface friendInfoProps {
  name: string;
  value: string;
}

export const HomePage = () => {
  const [friendInfo, setFriendInfo] = useState<friendInfoProps[]>(
    Array.from({ length: 3 }, () => ({ name: "", value: "" }))
  );

  const [results, setResults] = useState<string[]>([]);
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const [isAboutPopupOpen, setIsAboutPopupOpen] = useState(true);

  const handleAddFriend = () => {
    setFriendInfo((prevFriendInfo) => [
      ...prevFriendInfo,
      { name: "", value: "" },
    ]);
  };

  const handleRemoveFriend = () => {
    setFriendInfo((prevFriendInfo) => {
      const newFriendInfo = [...prevFriendInfo];
      newFriendInfo.pop();
      return newFriendInfo;
    });
  };

  const calculateShares = () => {
    const totalExpense = friendInfo.reduce(
      (acc, { value }) => acc + parseFloat(value) || 0,
      0
    );
    const averageExpense = totalExpense / friendInfo.length;

    const newResults = friendInfo.map(({ name, value }) => {
      let difference;
      if (parseFloat(value) > averageExpense) {
        difference = parseFloat(value) - averageExpense;
        return `<span data-result='return'>${name} повернути ${Math.round(
          difference
        )} грн</span>`;
      }
      difference = averageExpense - parseFloat(value);
      return `<span data-result='attach'>${name} докласти ${Math.round(
        difference
      )} грн</span>`;
    });

    setResults(newResults);
    setIsOpenPopup(true);
  };

  const minTwoFriendChecked =
    friendInfo.length <= 3 ? () => null : () => handleRemoveFriend();

  const popupRef = useRef(null);
  const aboutRef = useRef(null);

  useOnClickOutside(popupRef, () => setIsOpenPopup(false));
  useOnClickOutside(aboutRef, () => setIsAboutPopupOpen(false));

  return (
    <section className={styles.container}>
      <div className={styles.wrapper}>
        <NumberOfFriends
          handleAddFriend={() => handleAddFriend()}
          handleRemoveFriend={minTwoFriendChecked}
          numberOfFriends={friendInfo.length}
        />

        <Button className={styles.button} onClick={calculateShares}>
          Розподілити витрати
        </Button>

        <div className={styles.friendsList}>
          {friendInfo.map(({ name, value }, index) => (
            <div className={styles.friend} key={index}>
              <Input
                htmlFor={`friendName${index + 1}`}
                placeholder="Ім'я друга"
                name={`friendName${index + 1}`}
                id={`friendName${index + 1}`}
                value={name}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  const newInfo = [...friendInfo];
                  newInfo[index].name = e.target.value;
                  setFriendInfo(newInfo);
                }}
                className={styles.input}
              />
              <Input
                htmlFor={`friendValue${index + 1}`}
                placeholder="Витрати"
                name={`friendValue${index + 1}`}
                id={`friendValue${index + 1}`}
                value={value}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  const newInfo = [...friendInfo];
                  newInfo[index].value = e.target.value;
                  setFriendInfo(newInfo);
                }}
                className={styles.input}
              />
            </div>
          ))}
        </div>

        <Popup ref={popupRef} isOpen={isOpenPopup}>
          <Results results={results} />
        </Popup>

        <Popup
          onClose={() => setIsAboutPopupOpen(false)}
          ref={aboutRef}
          isOpen={isAboutPopupOpen}
        >
          <About />
        </Popup>
      </div>
    </section>
  );
};

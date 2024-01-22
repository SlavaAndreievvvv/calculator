"use client";

import { ChangeEvent, useRef, useState } from "react";
import { useFriendInfoValidation, useCalculateShares } from "@/utils/hooks";
import { useOnClickOutside } from "usehooks-ts";
import { Button, Popup } from "@/ui/components";
import {
  HomePageAbout,
  HomePageNumberOfFriends,
  HomePageResults,
  FriendInput,
} from "./components";
import styles from "./HomePage.module.css";
import Link from "next/link";

export interface friendInfoProps {
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
  const [nameDirties, setNameDirties] = useState<boolean[]>(
    Array.from({ length: 3 }, () => false)
  );
  const [valueDirties, setValueDirties] = useState<boolean[]>(
    Array.from({ length: 3 }, () => false)
  );

  const [nameErrors, setNameErrors] = useState<string[]>(
    Array.from({ length: 3 }, () => "не може бути пустим")
  );
  const [valueErrors, setValueErrors] = useState<string[]>(
    Array.from({ length: 3 }, () => "не може бути пустим")
  );

  const handleAddFriend = () => {
    setFriendInfo((prevFriendInfo) => [
      ...prevFriendInfo,
      { name: "", value: "" },
    ]);
    setNameDirties((prev) => [...prev, false]);
    setValueDirties((prev) => [...prev, false]);
    setNameErrors((prev) => [...prev, "не може бути пустим"]);
    setValueErrors((prev) => [...prev, "не може бути пустим"]);
  };

  const handleRemoveFriend = () => {
    setFriendInfo((prevFriendInfo) => {
      const newFriendInfo = [...prevFriendInfo];
      newFriendInfo.pop();

      setNameDirties((prev) => prev.slice(0, -1));
      setValueDirties((prev) => prev.slice(0, -1));
      setNameErrors((prev) => prev.slice(0, -1));
      setValueErrors((prev) => prev.slice(0, -1));

      return newFriendInfo;
    });
  };

  const calculateShares = useCalculateShares(
    friendInfo,
    nameErrors,
    valueErrors,
    setResults,
    setIsOpenPopup
  );

  const minTwoFriendChecked =
    friendInfo.length <= 3 ? () => null : () => handleRemoveFriend();

  const popupRef = useRef(null);
  const aboutRef = useRef(null);

  useOnClickOutside(popupRef, () => setIsOpenPopup(false));
  useOnClickOutside(aboutRef, () => setIsAboutPopupOpen(false));

  const blurHandler = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    switch (e.target.name) {
      case `name${index + 1}`:
        setNameDirties((prev) => {
          const newArr = [...prev];
          newArr[index] = true;
          return newArr;
        });
        break;
      case `value${index + 1}`:
        setValueDirties((prev) => {
          const newArr = [...prev];
          newArr[index] = true;
          return newArr;
        });
        break;
    }
  };

  const nameHandler = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const name = e.target.value;
    const newInfo = [...friendInfo];
    newInfo[index].name = name;
    setFriendInfo(newInfo);

    setNameDirties((prev) => {
      const newArr = [...prev];
      newArr[index] = true;
      return newArr;
    });

    setNameErrors((prev) => {
      const newArr = [...prev];
      newArr[index] = name.trim().length !== 0 ? "" : "не може бути пустим";
      return newArr;
    });
  };

  const valueHandler = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;
    const newInfo = [...friendInfo];
    newInfo[index].value = value;
    setFriendInfo(newInfo);

    setValueDirties((prev) => {
      const newArr = [...prev];
      newArr[index] = true;
      return newArr;
    });

    setValueErrors((prev) => {
      const newArr = [...prev];
      newArr[index] = /^\d+$/.test(value) ? "" : "має бути цифрою";
      return newArr;
    });
  };

  const validForm = useFriendInfoValidation({
    friendInfo,
    nameErrors,
    valueErrors,
  });

  return (
    <section className={styles.container}>
      <div className={styles.wrapper}>
        <HomePageNumberOfFriends
          handleAddFriend={() => handleAddFriend()}
          handleRemoveFriend={minTwoFriendChecked}
          numberOfFriends={friendInfo.length}
        />

        <form onSubmit={calculateShares} className={styles.form}>
          <div className={styles.buttonWrapper}>
            <Button
              className={styles.button}
              type="submit"
              disabled={!validForm}
            >
              Розподілити витрати
            </Button>
          </div>
          <ul className={styles.list}>
            {friendInfo.map(({ name, value }, index) => (
              <FriendInput
                key={index}
                index={index}
                name={name}
                value={value}
                nameError={nameErrors[index]}
                valueError={valueErrors[index]}
                nameDirties={nameDirties[index]}
                valueDirties={valueDirties[index]}
                onBlur={blurHandler}
                onNameChange={nameHandler}
                onValueChange={valueHandler}
              />
            ))}
          </ul>
        </form>

        <Popup
          cardClassName={styles.resultPopup}
          ref={popupRef}
          isOpen={isOpenPopup}
        >
          <HomePageResults results={results} />
        </Popup>

        <Popup
          onClose={() => setIsAboutPopupOpen(false)}
          ref={aboutRef}
          isOpen={isAboutPopupOpen}
        >
          <HomePageAbout />
        </Popup>
      </div>
      <Link
        href="https://github.com/SlavaAndreievvvv"
        target="_blank"
        className={styles.createdBy}
      >
        Created by @andreievvv
      </Link>
    </section>
  );
};

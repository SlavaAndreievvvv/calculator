"use client";

import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { Button, Input, Popup } from "@/ui/components";
import { About, NumberOfFriends, Results } from "./components";
import { useOnClickOutside } from "usehooks-ts";
import { motion } from "framer-motion";

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

  const [validForm, setValidForm] = useState(false);

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

  const calculateShares = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const isAnyNameEmpty = friendInfo.some(({ name }) => name.trim() === "");
    const isAnyValueEmpty = friendInfo.some(({ value }) => value.trim() === "");

    const hasNameError = nameErrors.some((error) => error !== "");
    const hasValueError = valueErrors.some((error) => error !== "");

    if (isAnyNameEmpty || isAnyValueEmpty) {
      alert("Будь ласка, заповніть всі поля");
      return;
    }

    if (hasNameError || hasValueError) {
      alert("Спочатку виправіть помилки");
      return;
    }

    const totalExpense = friendInfo.reduce(
      (acc, { value }) => acc + parseFloat(value) || 0,
      0
    );
    const averageExpense = totalExpense / friendInfo.length;

    const newResults = friendInfo.map(({ name, value }) => {
      let difference;
      if (parseFloat(value) > averageExpense) {
        difference = parseFloat(value) - averageExpense;
        return `<div data-result='return'>${name} повернути ${Math.round(
          difference
        )} грн</вшс>`;
      }
      difference = averageExpense - parseFloat(value);
      return `<div data-result='attach'>${name} докласти ${Math.round(
        difference
      )} грн</div>`;
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

  useEffect(() => {
    const isAnyNameEmpty = friendInfo.some(({ name }) => name.trim() === "");
    const isAnyValueEmpty = friendInfo.some(({ value }) => value.trim() === "");

    const hasNameError = nameErrors.some((error) => error !== "");
    const hasValueError = valueErrors.some((error) => error !== "");

    if (isAnyNameEmpty || isAnyValueEmpty || hasNameError || hasValueError) {
      setValidForm(false);
    } else {
      setValidForm(true);
    }
  }, [friendInfo, nameErrors, valueErrors, validForm]);

  return (
    <section className={styles.container}>
      <div className={styles.wrapper}>
        <NumberOfFriends
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
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    nameHandler(e, index)
                  }
                  onBlur={(e) => blurHandler(e, index)}
                  errorMessage={nameDirties[index] ? nameErrors[index] : null}
                  className={styles.input}
                />
                <Input
                  htmlFor={`value${index + 1}`}
                  placeholder="Витрати"
                  name={`value${index + 1}`}
                  id={`value${index + 1}`}
                  value={value}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    valueHandler(e, index)
                  }
                  onBlur={(e) => blurHandler(e, index)}
                  errorMessage={valueDirties[index] ? valueErrors[index] : null}
                  className={styles.input}
                />
              </motion.li>
            ))}
          </ul>
        </form>

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

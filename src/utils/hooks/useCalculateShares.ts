import { friendInfoProps } from "@/ui/pages";
import { FormEvent } from "react";

export const useCalculateShares = (
  friendInfo: friendInfoProps[],
  nameErrors: string[],
  valueErrors: string[],
  setResults: (results: string[]) => void,
  setIsOpenPopup: (isOpen: boolean) => void
) => {
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
        return `<div data-result='return'><span>${name} повернути</span> <span>
          ${Math.round(difference)}
         грн</span></div>`;
      }
      difference = averageExpense - parseFloat(value);
      return `<div data-result='attach'><span>${name} докласти</span> <span>
        ${Math.round(difference)}
       грн</span></div>`;
    });

    setResults(newResults);
    setIsOpenPopup(true);
  };

  return calculateShares;
};

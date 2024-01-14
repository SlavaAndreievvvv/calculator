import { useState, useEffect } from "react";

interface FriendInfo {
  name: string;
  value: string;
}

interface UseFriendInfoValidationProps {
  friendInfo: FriendInfo[];
  nameErrors: string[];
  valueErrors: string[];
}

export const useFriendInfoValidation = ({
  friendInfo,
  nameErrors,
  valueErrors,
}: UseFriendInfoValidationProps) => {
  const [validForm, setValidForm] = useState<boolean>(false);

  useEffect(() => {
    const isAnyNameEmpty = friendInfo.some(({ name }) => name.trim() === "");
    const isAnyValueEmpty = friendInfo.some(({ value }) => value.trim() === "");

    const hasNameError = nameErrors.some((error) => error !== "");
    const hasValueError = valueErrors.some((error) => error !== "");

    setValidForm(
      !(isAnyNameEmpty || isAnyValueEmpty || hasNameError || hasValueError)
    );
  }, [friendInfo, nameErrors, valueErrors]);

  return validForm;
};

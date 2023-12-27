"use client";

import { useEffect, useState } from "react";

export const useIsMobile = (size?: number) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < (size ?? 414)); // Adjust the threshold to define what constitutes as "mobile"
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return isMobile;
};

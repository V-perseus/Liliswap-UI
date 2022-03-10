import { useEffect, useState } from "react";

const getIsTablet = () => {
  if (typeof window !== "undefined") {
    return window.innerWidth <= 991;
  }
};

export default function useIsTablet() {
  const [isTablet, setIsTablet] = useState(getIsTablet());
  useEffect(() => {
    const onResize = () => {
      setIsTablet(getIsTablet());
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return [isTablet];
}

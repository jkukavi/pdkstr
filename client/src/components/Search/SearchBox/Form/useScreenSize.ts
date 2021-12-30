import { useState, useEffect } from "react";
import { throttle } from "helpers";

const useScreenSize = () => {
  const [smallScreen, setSmallScreen] = useState(window.innerWidth < 600);

  useEffect(() => {
    const checkResize = () => {
      if (window.innerWidth < 600 && !smallScreen) {
        setSmallScreen(true);
      } else if (window.innerWidth >= 600 && smallScreen) {
        setSmallScreen(false);
      }
    };
    const throttledCheckResize = throttle(checkResize, 100);

    window.addEventListener("resize", throttledCheckResize);

    return () => window.removeEventListener("resize", throttledCheckResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [smallScreen, setSmallScreen]);

  return smallScreen;
};

export default useScreenSize;

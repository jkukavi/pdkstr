import React, { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";

import { throttle, checkScroll, debounce } from "helpers";

const ScrollingDownContext = React.createContext<{
  scrollingDown: boolean;
  setScrollingDown: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  scrollingDown: false,
  setScrollingDown: () => {},
});

export const ScrollingDownProvider = ({ children }: { children: any }) => {
  const [scrollingDown, setScrollingDown] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setScrollingDown(false);
  }, [location]);

  return (
    <ScrollingDownContext.Provider value={{ scrollingDown, setScrollingDown }}>
      {children}
    </ScrollingDownContext.Provider>
  );
};

export const useScrollingDownContext = (id: string) => {
  const { scrollingDown, setScrollingDown } = useContext(ScrollingDownContext);
  const location = useLocation();

  useEffect(() => {
    const element = document.getElementById(id);
    if (element) {
      const debouncedSetScroll = debounce(setScrollingDown, 1500);
      const throttledCheckScroll = throttle(checkScroll(setScrollingDown), 500);
      const scrollHandler = () => {
        debouncedSetScroll(false);
        throttledCheckScroll();
      };

      element.addEventListener("scroll", scrollHandler);
      return () => {
        element.removeEventListener("scroll", scrollHandler);
      };
    }
  }, [location, setScrollingDown]);

  return scrollingDown;
};

import React, { useState, useEffect, useContext } from "react";

import { useLocation } from "react-router-dom";

import { throttle, checkScroll, debounce } from "../helpers/helpers";

const ScrollingDownContext = React.createContext(false);

export const ScrollingDownProvider = ({ children }) => {
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

export const useScrollingDownContext = (id) => {
  const { scrollingDown, setScrollingDown } = useContext(ScrollingDownContext);
  const location = useLocation();

  useEffect(() => {
    const element = document.getElementById(id);
    const debouncedSetScroll = debounce(setScrollingDown, 1500);
    const throttletCheckScroll = throttle(checkScroll(setScrollingDown), 500);
    const scrollHandler = () => {
      debouncedSetScroll(false);
      throttletCheckScroll();
    };

    element.addEventListener("scroll", scrollHandler);

    return () => {
      element.removeEventListener("scroll", scrollHandler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location, setScrollingDown]);

  return scrollingDown;
};

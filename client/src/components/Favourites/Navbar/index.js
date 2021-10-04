import React, { useState, useEffect } from "react";

import SmallScreenNavbar from "./SmallScreenNavbar";
import WideScreenNavbar from "./WideScreenNavbar";

import { throttle } from "helpers";

const Navbar = ({
  filter,
  setFilter,
  filters,
  queryString,
  debouncedSetQueryString,
  deleteQuery,
}) => {
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

  const navbarProps = {
    filter,
    setFilter,
    filters,
    queryString,
    debouncedSetQueryString,
    deleteQuery,
  };

  const Navbar = smallScreen ? SmallScreenNavbar : WideScreenNavbar;

  return <Navbar {...navbarProps} />;
};

export default Navbar;

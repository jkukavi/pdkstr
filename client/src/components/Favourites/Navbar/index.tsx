import React, { useState, useEffect } from "react";
import SmallScreenNavbar from "./SmallScreenNavbar";
import WideScreenNavbar from "./WideScreenNavbar";
import { throttle } from "helpers";

export type INavbar = {
  title: string;
  filter: ItemType;
  setFilter: (type: ItemType) => void;
  queryString: string;
  setQueryString: VoidFunction;
};

const Navbar: React.FC<INavbar> = ({
  title,
  filter,
  setFilter,
  queryString,
  setQueryString,
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
  }, [smallScreen, setSmallScreen]);

  const navbarProps = {
    title,
    filter,
    setFilter,
    queryString,
    setQueryString,
  };

  const Navbar = smallScreen ? SmallScreenNavbar : WideScreenNavbar;

  return <Navbar {...navbarProps} />;
};

export default Navbar;

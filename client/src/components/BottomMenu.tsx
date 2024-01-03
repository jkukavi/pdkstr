import React from "react";
import { NavLink, useLocation } from "react-router-dom";

import magnifier from "icons/magnifier.svg";
import history from "icons/history.svg";
import library from "icons/library.svg";
import { useQueryStringWasUpdated } from "helpers/pushToParams";

const NavLinkWithSearch = (props: React.ComponentProps<typeof NavLink>) => {
  useQueryStringWasUpdated();
  return (
    <NavLink {...props} to={props.to + location.search}>
      {props.children}
    </NavLink>
  );
};

const BottomMenu = () => {
  return (
    <div className="bottomMenu">
      <NavLinkWithSearch to="/history" activeClassName="active">
        <div className="icon">
          <img src={history} alt="alt"></img>
        </div>
      </NavLinkWithSearch>
      <NavLinkWithSearch exact to="/" activeClassName="active">
        <div className="icon">
          <img src={magnifier} alt="alt"></img>
        </div>
      </NavLinkWithSearch>
      <NavLinkWithSearch to="/favourites" activeClassName="active">
        <div className="icon">
          <img src={library} alt="alt"></img>
        </div>
      </NavLinkWithSearch>
    </div>
  );
};

export default BottomMenu;

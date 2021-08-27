import React from "react";

import { NavLink } from "react-router-dom";

import magnifier from "../icons/magnifier.png";
import history from "../icons/history.png";
import library from "../icons/library.png";

const BottomMenu = () => {
  return (
    <div className="bottomMenu">
      <NavLink to="/history" activeClassName="active">
        <div className="icon">
          <img src={history} alt="alt"></img>
        </div>
      </NavLink>
      <NavLink exact to="/" activeClassName="active">
        <div className="icon">
          <img src={magnifier} alt="alt"></img>
        </div>
      </NavLink>
      <NavLink to="/favourites" activeClassName="active">
        <div className="icon">
          <img src={library} alt="alt"></img>
        </div>
      </NavLink>
    </div>
  );
};

export default BottomMenu;

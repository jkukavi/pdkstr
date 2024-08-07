import React from "react";
import { NavLink, useLocation } from "react-router-dom";

import magnifier from "icons/magnifier.svg";
import history from "icons/history.svg";
import library from "icons/library.svg";
import settings from "icons/settings.svg";
import { useQueryStringWasUpdated } from "helpers/pushToParams";
import styled from "styled-components";

const NavLinkWithSearch = (props: React.ComponentProps<typeof NavLink>) => {
  useQueryStringWasUpdated();
  return (
    <NavLink {...props} to={props.to + location.search}>
      {props.children}
    </NavLink>
  );
};

const Menu = styled.div`
  margin-right: calc(100% - 100vw);
  position: fixed;
  z-index: 2;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2.5rem;
  background-color: #343434;
  border-top: 1px solid #6b6b6b;
  box-shadow: 0px -1px 3px 0px #000000;
  display: flex;

  & a {
    flex-grow: 1;
  }

  & a:nth-child(even) {
    border-left: 1px solid #6b6b6b;
    border-right: 1px solid #6b6b6b;
  }

  & a.active {
    background-color: #454545;
  }
`;

const Icon = styled.div`
  display: inline-flex;
  width: 100%;
  height: 100%;

  justify-content: center;
  align-items: center;
  cursor: pointer;

  & img {
    width: 25px;
    height: 25px;
  }
`;

const BottomMenu = () => {
  return (
    <Menu>
      <NavLinkWithSearch to="/history" activeClassName="active">
        <Icon>
          <img src={history} alt="alt"></img>
        </Icon>
      </NavLinkWithSearch>
      <NavLinkWithSearch exact to="/" activeClassName="active">
        <Icon>
          <img src={magnifier} alt="alt"></img>
        </Icon>
      </NavLinkWithSearch>

      <NavLinkWithSearch to="/favourites" activeClassName="active">
        <Icon>
          <img src={library} alt="alt"></img>
        </Icon>
      </NavLinkWithSearch>
      <NavLinkWithSearch exact to="/recommendation" activeClassName="active">
        <Icon>
          <img src={settings} alt="alt"></img>
        </Icon>
      </NavLinkWithSearch>
    </Menu>
  );
};

export default BottomMenu;

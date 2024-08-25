import Cards from "components/Cards";
import cardTypesBySize from "components/Cards/cardTypesBySize";
import React from "react";
import ReactDOM from "react-dom";

import "./pages/App/App.css";
import styled, { ThemeProvider } from "styled-components";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import MockedNotification from "components/Notifications/mocked";
import SmallChannelCard from "components/Cards/mocked/SmallChannelCard";
import MockedDropdown from "components/Dropdown/mocked";
import { theme } from "consts/theme";

const MenuItem = styled.div`
  width: 150px;
  background-color: #484848;
  padding: 8px;
  border: 1px solid #adadad;
  color: white;
  font-size: 16;
  cursor: pointer;
  transition: background-color 0.2s;

  &:not(:last-child) {
    border-bottom: none;
  }

  &:hover {
    background-color: #414141;
  }
`;

const NavBar = ({ paths }: { paths: string[] }) => {
  return (
    <div style={{ position: "absolute", top: 0, left: 0 }}>
      {paths.map((path) => {
        return (
          <Link to={path} style={{ textDecoration: "none" }}>
            <MenuItem>{path}</MenuItem>
          </Link>
        );
      })}
    </div>
  );
};

const componentsArray = [
  {
    name: "card",
    component: SmallChannelCard,
  },
  {
    name: "notification",
    component: MockedNotification,
  },
  {
    name: "dropdown",
    component: MockedDropdown,
  },
] as const;

const componentPaths = componentsArray.map((item) => item.name);

const Components = () => {
  return (
    <ThemeProvider theme={theme}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          position: "relative",
        }}
      >
        <BrowserRouter>
          <NavBar paths={componentPaths} />
          <Switch>
            {componentsArray.map((componentInfo) => (
              <Route path={`/${componentInfo.name}`}>
                <componentInfo.component />
              </Route>
            ))}
          </Switch>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
};

ReactDOM.render(<Components />, document.getElementById("root"));

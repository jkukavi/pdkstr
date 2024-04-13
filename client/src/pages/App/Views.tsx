import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import History from "components/History";
import Favourites from "components/Favourites";
import Search from "components/Search";
import Settings from "components/Settings";
import Recommendations from "components/Recommendations";

const Screens = () => {
  return (
    <Switch>
      <Route path="/history">
        <History />
      </Route>
      <Route path="/favourites">
        <Favourites />
      </Route>
      <Route path="/settings">
        <Settings />
      </Route>
      <Route path="/recommendation">
        <Recommendations />
      </Route>
      <Route path="/">
        <Search />
      </Route>
      <Route path="/">
        <Redirect to="/"></Redirect>
      </Route>
    </Switch>
  );
};

export default Screens;

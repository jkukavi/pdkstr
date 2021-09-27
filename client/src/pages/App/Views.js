import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import History from "../../components/History";
import Favourites from "../../components/Favourites";
import Search from "../../components/Search";
import Settings from "../../components/Settings";

const Views = () => {
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
      <Route exact path="/">
        <Search />
      </Route>
      <Route path="/">
        <Redirect to="/"></Redirect>
      </Route>
    </Switch>
  );
};

export default Views;

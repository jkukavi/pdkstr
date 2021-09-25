import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import History from "../../components/History";
import Favourites from "../../components/Favourites";
import Search from "../../components/Search";
import BottomMenu from "../../components/BottomMenu";
import AudioShelf from "../../components/AudioShelf";
import PlaylistSidebar from "../../components/PlaylistSideBar";
import Settings from "../../components/Settings";
import Notifications from "../../components/Notifications";
import { ScrollingDownProvider } from "../../contexts/ScrollingDown";
import { UserDataProvider } from "../../contexts/UserData";

import "./App.css";

function App() {
  return (
    <div className="container">
      <UserDataProvider>
        <ScrollingDownProvider>
          <Notifications />

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

          <PlaylistSidebar />

          <AudioShelf />

          <BottomMenu />
        </ScrollingDownProvider>
      </UserDataProvider>
    </div>
  );
}

export default App;

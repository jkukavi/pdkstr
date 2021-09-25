import React, { useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import "./App.css";

import History from "../../components/History";
import Favourites from "../../components/Favourites";
import Search from "../../components/Search";
import BottomMenu from "../../components/BottomMenu";
import AudioShelf from "../../components/AudioShelf";
import PrintScreen from "../../components/PrintScreen";
import PlaylistSidebar from "../../components/PlaylistSideBar";
import Settings from "./Settings";
import Notifications from "../../components/Notifications";
import { ScrollingDownProvider } from "../../contexts/ScrollingDown";

function App() {
  //"data"
  const [history, setHistory] = useState(null);
  const [favourites, setFavourites] = useState(null);

  return (
    <>
      <div className="container">
        <ScrollingDownProvider>
          <PrintScreen>
            {/*Pass an object in to have it on screen  */}
            {{ message: "helloWorld" }}
          </PrintScreen>

          <Notifications />

          <Switch>
            <Route path="/history">
              <History history={history} setHistory={setHistory} />
            </Route>
            <Route path="/favourites">
              <Favourites
                favourites={favourites}
                setFavourites={setFavourites}
              />
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
      </div>
    </>
  );
}

export default App;

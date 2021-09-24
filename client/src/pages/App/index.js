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
import Notifications, { notify } from "../../components/Notifications";
import { instance as axios } from "../../contexts/axiosInstance";
import { ScrollingDownProvider } from "../../contexts/ScrollingDown";

function App() {
  //"data"
  const [history, setHistory] = useState(null);
  const [favourites, setFavourites] = useState(null);

  const addToHistory = async (item) => {
    try {
      await axios.post("/users/my/history", { item });
    } catch (e) {
      notify("Unable to record this listening to history.");
    }
  };

  const addToFavourites = async (item) => {
    try {
      await axios.post("/users/my/favourites", { item });
      notify("Added to favourites");
    } catch (e) {
      notify("Unable to add to favourites");
    }
  };

  const cardProps = {
    addToHistory,
    addToFavourites,
    notify,
  };

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
              <History
                history={history}
                setHistory={setHistory}
                cardProps={cardProps}
                notify={notify}
              />
            </Route>
            <Route path="/favourites">
              <Favourites
                favourites={favourites}
                setFavourites={setFavourites}
                cardProps={cardProps}
                notify={notify}
              />
            </Route>
            <Route path="/settings">
              <Settings />
            </Route>
            <Route exact path="/">
              <Search
                notify={notify}
                cardProps={cardProps}
                addToFavourites={addToFavourites}
              />
            </Route>
            <Route path="/">
              <Redirect to="/"></Redirect>
            </Route>
          </Switch>

          <PlaylistSidebar />

          <AudioShelf addToHistory={addToHistory} notify={notify} />

          <BottomMenu />
        </ScrollingDownProvider>
      </div>
    </>
  );
}

export default App;

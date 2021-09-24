import React, { useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import { addRandomKey } from "../../helpers/helpers";
import { paths } from "../../consts/index.js";
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

let preventBlur = false;

function App() {
  //audioshelf

  //playlistsidebar
  const [browsingPlaylist, setBrowsingPlaylist] = useState({
    items: [],
    expanded: false,
  });

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

  const getPlaylistItems = async (playlist) => {
    const path = paths.playlistItems[playlist.engine];

    const id = playlist.id;

    try {
      const response = await axios.post(path, {
        id,
      });
      const { playlistItems } = response.data;
      return playlistItems;
    } catch (e) {
      notify("Something went wrong. Try again.");
    }
  };

  const browsePlaylist = async (playlist) => {
    try {
      notify("Loading playlist...");
      const playlistItems = await getPlaylistItems(playlist);
      setBrowsingPlaylist({
        items: playlistItems.map(addRandomKey),
        info: playlist,
        expanded: true,
      });
    } catch (e) {
      notify(
        "Something went wrong with trying to fetch information about this playlist."
      );
    }
  };

  const closeBrowsingPlaylist = () => {
    setBrowsingPlaylist((bp) => ({ ...bp, expanded: false }));
  };

  const cardProps = {
    browsePlaylist,
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
                setHistory={setHistory}
                history={history}
                cardProps={cardProps}
                notify={notify}
              />
            </Route>
            <Route path="/favourites">
              <Favourites
                setFavourites={setFavourites}
                favourites={favourites}
                cardProps={cardProps}
                notify={notify}
              />
            </Route>
            <Route path="/settings">
              <Settings />
            </Route>
            <Route exact path="/">
              <Search
                addToFavourites={addToFavourites}
                preventBlur={preventBlur}
                notify={notify}
                cardProps={cardProps}
              />
            </Route>
            <Route path="/">
              <Redirect to="/"></Redirect>
            </Route>
          </Switch>

          <PlaylistSidebar
            browsingPlaylist={browsingPlaylist}
            closeBrowsingPlaylist={closeBrowsingPlaylist}
            tableProps={{
              tableTitle: "Playlist: " + browsingPlaylist.info?.title,
              tableArray: browsingPlaylist.items,
              notify: notify,
            }}
          />

          <AudioShelf
            addToHistory={addToHistory}
            getPlaylistItems={getPlaylistItems}
            notify={notify}
          />

          <BottomMenu />
        </ScrollingDownProvider>
      </div>
    </>
  );
}

export default App;

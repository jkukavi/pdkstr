import React, { useState, useRef, useEffect } from "react";
import {
  useHistory,
  Redirect,
  Route,
  Switch,
  useLocation,
} from "react-router-dom";
import qs from "query-string";

import { addRandomKey, storage } from "../../helpers/helpers";
import {
  paths,
  searchEngines,
  searchEnginesByShortcut,
} from "../../consts/index.js";
import speak from "../../helpers/speak";
import "./App.css";

import History from "../../components/History";
import Favourites from "../../components/Favourites";
import Search from "../../components/Search";
import BottomMenu from "../../components/BottomMenu";
import AudioShelf from "../../components/AudioShelf";
import ShareAlert from "../../components/ShareAlert";
import PrintScreen from "../../components/PrintScreen";
import PlaylistSidebar from "../../components/PlaylistSideBar";
import Settings from "./Settings";
import Notifications from "../../components/Notifications";

import { instance as axios } from "../../contexts/axiosInstance";

let preventBlur = false;

function App() {
  const [directUrl, setDirectUrl] = useState(null);
  const [audioLoading, setAudioLoading] = useState(false);

  const [expanded, setExpanded] = useState(false);

  const [notifications, setNotifications] = useState([]);
  const [playlist, setPlaylist] = useState([]);
  const [browsingPlaylist, setBrowsingPlaylist] = useState({
    items: [],
    expanded: false,
  });
  const [activeVideo, setActiveVideo] = useState(null);
  const [listeningTo, setListeningTo] = useState(null);
  const [info, setInfo] = useState(null);
  const [scrollingDown, setScrollingDown] = useState(false);

  //"data"
  const [history, setHistory] = useState(null);
  const [favourites, setFavourites] = useState(null);

  //trigger for sharing
  const location = useLocation();
  const [alert, setAlert] = useState(qs.parse(location.search).id);
  const searchHistory = useHistory();

  useEffect(() => {
    setScrollingDown(false);
  }, [location]);

  const listHistory = async () => {
    try {
      const response = await axios.get("/users/my/history");
      const fetchedHistory = response.data.map(addRandomKey);
      setHistory(fetchedHistory);
    } catch (e) {
      notify("Unable to fetch history");
    }
  };

  const listFavourites = async () => {
    try {
      const response = await axios.get("/users/my/favourites");
      const fetchedFavourites = response.data.map(addRandomKey);
      setFavourites(fetchedFavourites);
    } catch (e) {
      notify("Unable to fetch history");
    }
  };

  const deleteAll = (name) => () => {
    storage.clean(name);
    listHistory();
    listFavourites();
  };

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

  useEffect(() => {
    const queryString = qs.parse(location.search);
    if (queryString.id) {
      const [sharedEngineShortcut, sharedId] = queryString.id.split(".");

      const sharedEngine = searchEnginesByShortcut[sharedEngineShortcut];
      getInfo({ id: sharedId, engine: sharedEngine });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const getInfo = async ({ id, engine }) => {
    const path = paths.trackInfo[engine];
    try {
      const response = await axios.post(path, {
        id,
      });
      setInfo(response.data);
    } catch (e) {
      notify("Something went wrong. Try again.");
    } finally {
      setAudioLoading(false);
    }
  };

  const getDirectUrl = async ({ id, engine, url }) => {
    setDirectUrl(null);
    setAudioLoading(true);
    setScrollingDown(false);
    const path = paths.directUrl[engine];
    try {
      const response = await axios.post(path, {
        id,
        ...(engine === searchEngines.SC && { fromUrl: url }),
      });
      const { directUrl } = response.data;
      setDirectUrl(directUrl);
    } catch (e) {
      notify("Something went wrong. Try again.");
    } finally {
      setAudioLoading(false);
    }
  };

  const playPlaylist = async (playlist) => {
    try {
      const playlistItems = await getPlaylistItems(playlist);
      setPlaylist(playlistItems.map(addRandomKey));
      setListeningTo(playlistItems[0]);
      getDirectUrl(playlistItems[0]);
    } catch (e) {
      notify("Something went wrong with trying to play this playlist.");
    }
  };

  const playNext = () => {
    if (playlist.length !== 0) {
      if (listeningTo) speak(`Item ${listeningTo.title.slice(0, 20)} ended`);
      const playedIndex = playlist.findIndex(
        (item) => item.title === listeningTo.title
      );
      const nextItem = playlist[playedIndex + 1];
      if (nextItem) {
        speak(`Playing ${nextItem.title.slice(0, 20)} next`);
        setListeningTo(nextItem);
        getDirectUrl(nextItem);
      }
    }
  };

  const addToQueue = (item) => {
    if (playlist.length === 0) {
      getDirectUrl(item);
      setActiveVideo(null);
      setListeningTo(item);
      addToHistory(item);
      setTimeout(() => {
        notify(`Listening to: ${item.title}`);
      }, 500);
    }
    setPlaylist([...playlist, item]);
    notify("Added to playing queue");
  };

  const closeBrowsingPlaylist = () => {
    setBrowsingPlaylist((bp) => ({ ...bp, expanded: false }));
  };

  const notify = (newNotification) => {
    setNotifications((notifications) => [...notifications, newNotification]);
  };

  const cardProps = {
    getDirectUrl,
    playPlaylist,
    browsePlaylist,
    setActiveVideo,
    setListeningTo,
    setScrollingDown,
    addToHistory,
    addToFavourites,
    notify,
    addToQueue,
  };

  return (
    <>
      <div className="container">
        <PrintScreen>
          {JSON.stringify(
            {
              favourites: (favourites || []).map((item) => item.type),
              his: searchHistory.length,
            },
            null,
            2
          )}
        </PrintScreen>
        <Notifications notifications={notifications} />
        <Switch>
          <Route path="/history">
            <History
              listHistory={listHistory}
              history={history}
              cardProps={cardProps}
            />
          </Route>
          <Route path="/favourites">
            <Favourites
              listFavourites={listFavourites}
              favourites={favourites}
              playPlaylist={playPlaylist}
              cardProps={cardProps}
            />
          </Route>
          <Route path="/settings">
            <Settings />
          </Route>
          <Route exact path="/">
            <Search
              scrollingDown={scrollingDown}
              addToFavourites={addToFavourites}
              preventBlur={preventBlur}
              notify={notify}
              notifications={notifications}
              cardProps={cardProps}
            />
          </Route>
          <Route path="/">
            <Redirect to="/"></Redirect>
          </Route>
        </Switch>

        <PlaylistSidebar
          browsingPlaylist={browsingPlaylist}
          playPlaylist={playPlaylist}
          closeBrowsingPlaylist={closeBrowsingPlaylist}
          tableFunctions={{
            tableArray: browsingPlaylist.items,
            tableTitle: "Playlist: " + browsingPlaylist.info?.title,
            notify: notify,
            deleteAll: deleteAll("history"),
            listeningTo: listeningTo,
            activeVideo: activeVideo,
            getDirectUrl,
            setActiveVideo,
            setListeningTo,
          }}
        />

        {!!location.search && (
          <ShareAlert
            info={info}
            alert={alert}
            getDirectUrl={getDirectUrl}
            setListeningTo={setListeningTo}
            notify={notify}
            setAlert={setAlert}
          />
        )}

        <AudioShelf
          directUrl={directUrl}
          audioLoading={audioLoading}
          scrollingDown={scrollingDown}
          listeningTo={listeningTo}
          notify={notify}
          expanded={expanded}
          playNext={playNext}
          setExpanded={setExpanded}
          setAudioLoading={setAudioLoading}
          setDirectUrl={setDirectUrl}
          playlist={playlist}
          setPlaylist={setPlaylist}
          setListeningTo={setListeningTo}
          activeVideo={activeVideo}
          setActiveVideo={setActiveVideo}
          getDirectUrl={getDirectUrl}
        />

        <BottomMenu />
      </div>
    </>
  );
}

export default App;

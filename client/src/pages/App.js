import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Route, useLocation } from "react-router-dom";
import qs from "query-string";

import { storage } from "../helpers/helpers";
import {
  menu,
  paths,
  searchEngines,
  searchEnginesByShortcut,
} from "../consts/index.js";
import speak from "../helpers/speak";
import "./App.css";

import History from "../components/History";
import Favourites from "../components/Favourites";
import SearchBox from "../components/SearchBox";
import Cards from "../components/Cards";
import BottomMenu from "../components/BottomMenu";
import AudioShelf from "../components/AudioShelf";
import ShareAlert from "../components/ShareAlert";
import PrintScreen from "../components/PrintScreen";
import PlaylistSidebar from "../components/PlaylistSideBar";

let preventBlur = false;

function App() {
  const [directUrl, setDirectUrl] = useState(null);
  const [audioLoading, setAudioLoading] = useState(false);
  const [arrayLoading, setArrayLoading] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [searchString, setSearchString] = useState("");
  const [searchArray, setSearchArray] = useState([]);
  const [viewingChannel, setViewingChannel] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [playlist, setPlaylist] = useState([]);
  const [browsingPlaylist, setBrowsingPlaylist] = useState({
    items: [],
    expanded: false,
  });
  const [activeVideo, setActiveVideo] = useState(null);
  const [listeningTo, setListeningTo] = useState(null);
  const [info, setInfo] = useState(null);
  const [suggestions, setSuggestions] = useState({ show: false, array: [] });
  const [scrollingDown, setScrollingDown] = useState(false);
  const [browsingHistory, setBrowsingHistory] = useState(null);
  const [favourites, setFavourites] = useState(null);
  const [searchEngine, setSearchEngine] = useState(searchEngines.YT);

  const location = useLocation();
  const [alert, setAlert] = useState(qs.parse(location.search));

  const audioPlayerRef = useRef();

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

  const listHistory = () => {
    const history = storage.get("history");
    setBrowsingHistory(history);
  };

  const listFavourites = () => {
    const fetchedFavourites = storage.get("favourites");
    setFavourites(fetchedFavourites);
  };

  const deleteAll = (name) => () => {
    storage.clean(name);
    listHistory();
    listFavourites();
  };

  const addToHistory = (item) => {
    storage.add("history", item);
  };

  const addToFavourites = (item) => {
    notify("Added To Favourites");
    storage.add("favourites", item);
  };

  useEffect(() => {
    if (!!location.search) {
      const [sharedEngineShortcut, sharedId] = qs
        .parse(location.search)
        .id.split(".");

      const sharedEngine = searchEnginesByShortcut[sharedEngineShortcut];
      getInfo({ id: sharedId, engine: sharedEngine });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const replay = (time) => () => {
    const audioPlayer = audioPlayerRef.current;
    audioPlayer.currentTime = audioPlayer.currentTime + time;
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
      window.alert("some error happened, please kontakt the dev team");
    } finally {
      setAudioLoading(false);
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
      window.alert("some error happened, please kontakt the dev team");
    } finally {
      setAudioLoading(false);
    }
  };

  const searchYoutube = async (event, newSearchString) => {
    if (event?.preventDefault) event.preventDefault();
    if (!searchString && !newSearchString) {
      return;
    }
    setSearchArray([]);
    setSuggestions({ ...suggestions, show: false });
    setArrayLoading(true);
    setViewingChannel(false);
    console.log(searchString);
    const url = paths.search[searchEngine];
    try {
      const response = await axios.post(url, {
        searchString: newSearchString || searchString,
      });
      const searchResultsArray = response.data.searchResultsArray;
      setSearchArray(searchResultsArray);
      setViewingChannel(false);
    } catch (e) {
    } finally {
      setArrayLoading(false);
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
      notify("Something went wrong with fetching playlist items.");
    }
  };

  const getChannelItems = async (item) => {
    setSearchArray([]);
    setArrayLoading(true);

    const path = paths.channelItems[item.engine];

    const channelId = {
      [searchEngines.YT]: (type) =>
        ({
          channel: item.channelID,
          [undefined]: item.channelID,
          video: item.author?.channelID,
        }[type]),
      [searchEngines.SC]: (type) =>
        ({ [undefined]: item.id, video: item.author?.id }[type]),
    }[item.engine](item.type);

    const channelInfo = {
      [searchEngines.YT]: (type) =>
        ({
          channel: item,
          [undefined]: item,
          video: item.author,
        }[type]),
      [searchEngines.SC]: (type) =>
        ({ [undefined]: item, video: item.author }[type]),
    }[item.engine](item.type);

    try {
      const response = await axios.post(path, {
        channelId,
      });
      const searchResultsArray = response.data.searchResultsArray;
      setViewingChannel({ ...channelInfo, engine: item.engine });
      setSearchArray(searchResultsArray);
    } catch (e) {
    } finally {
      setArrayLoading(false);
    }
  };

  const getChannelPlaylists = async (item) => {
    setSearchArray([]);
    setArrayLoading(true);

    const path = paths.channelPlaylists[item.engine];

    const channelId = {
      [searchEngines.YT]: (type) =>
        ({
          channel: item.channelID,
          [undefined]: item.channelID,
          video: item.author?.channelID,
        }[type]),
      [searchEngines.SC]: (type) =>
        ({ [undefined]: item.id, video: item.author?.id }[type]),
    }[item.engine](item.type);

    const channelInfo = {
      [searchEngines.YT]: (type) =>
        ({
          channel: item,
          [undefined]: item,
          video: item.author,
        }[type]),
      [searchEngines.SC]: (type) =>
        ({ [undefined]: item, video: item.author }[type]),
    }[item.engine](item.type);

    try {
      const response = await axios.post(path, {
        channelId,
      });
      const searchResultsArray = response.data.searchResultsArray;
      setViewingChannel({ ...channelInfo, engine: item.engine });
      setSearchArray(searchResultsArray);
    } catch (e) {
    } finally {
      setArrayLoading(false);
    }
  };

  const rounded = (num) => Math.round((num + Number.EPSILON) * 100) / 100;

  const getViewsString = (stringNumber) => {
    const num = Number(stringNumber);
    const million = 1000 * 1000;
    const thousand = 1000;
    const billion = 1000 * 1000 * 1000;

    if (num > billion) {
      const billions = rounded(num / billion);
      return `${billions}B`;
    } else if (num > million) {
      const millions = rounded(num / million);
      return `${millions}M`;
    } else if (num > thousand) {
      const thousands = rounded(num / thousand);
      return `${thousands}K`;
    } else {
      return num;
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

  const playPlaylist = async (playlist) => {
    try {
      const playlistItems = await getPlaylistItems(playlist);
      setPlaylist(playlistItems);
      setListeningTo(playlistItems[0]);
      getDirectUrl(playlistItems[0]);
    } catch (e) {
      notify("Something went wrong with trying to play this playlist.");
    }
  };

  const browsePlaylist = async (playlist) => {
    try {
      notify("Loading playlist...");
      const playlistItems = await getPlaylistItems(playlist);
      setBrowsingPlaylist({
        items: playlistItems,
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

  const notify = (newNotification) => {
    setNotifications((notifications) => [...notifications, newNotification]);
  };

  const input = useRef();
  const searchForm = useRef();

  const startSearch = (recognizedString) => {
    setSearchString(recognizedString);
    searchYoutube(null, recognizedString);
  };

  return (
    <>
      <div className="container">
        <PrintScreen>
          {JSON.stringify(
            {
              location,
              scrollingDown,
              viewingChannel,
              searchEngine,
              playlist: playlist.map && playlist.map((item) => item.title),
              activeVideo: activeVideo?.title,
              listeningTo: {
                title: listeningTo?.title,
                engine: listeningTo?.engine,
              },
              info: info?.title,
              searchArray: searchArray.map((item) => item.id),
            },
            null,
            2
          )}
        </PrintScreen>
        <SearchBox
          scrollingDown={scrollingDown || location.pathname !== menu.SEARCH}
          searchForm={searchForm}
          setSearchEngine={setSearchEngine}
          searchEngine={searchEngine}
          searchYoutube={searchYoutube}
          searchString={searchString}
          input={input}
          setSuggestions={setSuggestions}
          suggestions={suggestions}
          preventBlur={preventBlur}
          setSearchString={setSearchString}
          startSearch={startSearch}
          notify={notify}
          notifications={notifications}
          viewingChannel={viewingChannel}
          getChannelItems={getChannelItems}
          getChannelPlaylists={getChannelPlaylists}
        />

        <Route path="/history">
          <History
            listHistory={listHistory}
            notify={notify}
            deleteAll={deleteAll}
            listeningTo={listeningTo}
            browsingHistory={browsingHistory}
            activeVideo={activeVideo}
            getDirectUrl={getDirectUrl}
            setActiveVideo={setActiveVideo}
            setListeningTo={setListeningTo}
            getViewsString={getViewsString}
          />
        </Route>
        <Route path="/favourites">
          <Favourites
            listFavourites={listFavourites}
            notify={notify}
            tableArray={favourites}
            listeningTo={listeningTo}
            deleteAll={deleteAll}
            activeVideo={activeVideo}
            getDirectUrl={getDirectUrl}
            setActiveVideo={setActiveVideo}
            setListeningTo={setListeningTo}
            getViewsString={getViewsString}
          />
        </Route>
        <Route path="/">
          <Cards
            arrayLoading={arrayLoading}
            searchArray={searchArray}
            viewingChannel={viewingChannel}
            getDirectUrl={getDirectUrl}
            getChannelItems={getChannelItems}
            setActiveVideo={setActiveVideo}
            setListeningTo={setListeningTo}
            setScrollingDown={setScrollingDown}
            playPlaylist={playPlaylist}
            browsePlaylist={browsePlaylist}
            addToHistory={addToHistory}
            addToFavourites={addToFavourites}
            notify={notify}
            addToQueue={addToQueue}
            getViewsString={getViewsString}
          />
        </Route>

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
            getViewsString,
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
          replay={replay}
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
          getViewsString={getViewsString}
          audioPlayerRef={audioPlayerRef}
          getDirectUrl={getDirectUrl}
        />

        <BottomMenu />
      </div>
    </>
  );
}

export default App;

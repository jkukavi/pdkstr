import React, { useState, useRef, useEffect, useCallback } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import qs from "query-string";

import { storage, throttle, debounce, checkScroll } from "./helpers";
import { menu } from "./consts";

import "./App.css";

import SearchBox from "./components/SearchBox";
import Cards from "./components/Cards";
import BottomMenu from "./components/BottomMenu";
import AudioShelf from "./components/AudioShelf";
import Table from "./components/Table";
import ShareAlert from "./components/ShareAlert";

import magnifier from "./icons/magnifier.png";
import history from "./icons/history.png";
import library from "./icons/library.png";

let preventBlur = false;

function App() {
  const [page, setPage] = useState(menu.SEARCH);
  const [directUrl, setDirectUrl] = useState(null);
  const [audioLoading, setAudioLoading] = useState(false);
  const [arrayLoading, setArrayLoading] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [searchString, setSearchString] = useState("");
  const [searchArray, setSearchArray] = useState([]);
  const [viewingChannel, setViewingChannel] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [playlist, setPlaylist] = useState([]);
  const [activeVideo, setActiveVideo] = useState(null);
  const [listeningTo, setListeningTo] = useState(null);
  const [info, setInfo] = useState(null);
  const [suggestions, setSuggestions] = useState({ show: false, array: [] });
  const [scrollingDown, setScrollingDown] = useState(false);
  const [browsingHistory, setBrowsingHistory] = useState(null);
  const location = useLocation();
  const [alert, setAlert] = useState(qs.parse(location.search));

  const audioPlayerRef = useRef();

  const listHistory = () => {
    const history = storage.get();
    setBrowsingHistory(history);
  };

  const addToHistory = (item) => {
    storage.add(item);
  };

  useEffect(() => {
    window.addEventListener(
      "scroll",
      throttle(checkScroll(setScrollingDown), 500)
    );
  }, []);

  useEffect(() => {
    if (!!location.search) {
      getInfo(qs.parse(location.search).id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const replay = (time) => () => {
    const audioPlayer = audioPlayerRef.current;
    audioPlayer.currentTime = audioPlayer.currentTime + time;
  };

  const getDirectUrl = async (url) => {
    setDirectUrl(null);
    setAudioLoading(true);
    try {
      const response = await axios.post("/url", {
        url,
      });
      const { directUrl } = response.data;
      setDirectUrl(directUrl);
    } catch (e) {
      window.alert("some error happened, please kontakt the dev team");
    } finally {
      setAudioLoading(false);
    }
  };

  const getInfo = async (id) => {
    try {
      const response = await axios.post("/info", {
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
    if (searchString === "" && newSearchString === "") return;
    setSearchArray([]);
    setSuggestions({ ...suggestions, show: false });
    setArrayLoading(true);
    setViewingChannel(false);
    console.log(searchString);
    try {
      const response = await axios.post("/search", {
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

  const getPlaylistVideos = async (event, playlistUrl) => {
    event.preventDefault();
    setSearchArray([]);
    setArrayLoading(true);
    try {
      const response = await axios.post("/playlist", {
        playlistUrl,
      });
      const searchResultsArray = response.data.searchResultsArray;
      setViewingChannel(searchResultsArray[0].author.name);
      setSearchArray(searchResultsArray);
    } catch (e) {
    } finally {
      setArrayLoading(false);
    }
  };

  const handleInput = (e) => {
    setSearchString(e.target.value);
    debouncedGetSuggestions(e.target.value.toString());
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

  const addToQueue = (video) => {
    setPlaylist([...playlist, video]);
  };

  const notify = (newNotification) => {
    setNotifications([...notifications, newNotification]);
  };

  const getSuggestions = async (string) => {
    if (!string) {
      setSuggestions({ show: false, array: [] });
      return;
    }
    try {
      const response = await axios.post("/suggestions", {
        searchString: string,
      });
      const { suggestionsArray } = response.data;
      setSuggestions({ show: true, array: suggestionsArray });
    } catch (e) {
      window.alert("some error happened, please kontakt the dev team");
    } finally {
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedGetSuggestions = useCallback(
    debounce(getSuggestions, 200),
    []
  );

  const input = useRef();
  const searchForm = useRef();

  const startSearch = (recognizedString) => {
    setSearchString(recognizedString);
    searchYoutube(null, recognizedString);
  };

  return (
    <>
      <SearchBox
        scrollingDown={scrollingDown || page !== menu.SEARCH}
        searchForm={searchForm}
        searchYoutube={searchYoutube}
        searchString={searchString}
        handleInput={handleInput}
        input={input}
        setSuggestions={setSuggestions}
        suggestions={suggestions}
        preventBlur={preventBlur}
        setSearchString={setSearchString}
        startSearch={startSearch}
        notify={notify}
        notifications={notifications}
      />

      {page === menu.HISTORY && (
        <Table
          tableTitle="History"
          notify={notify}
          tableArray={browsingHistory}
          activeVideo={activeVideo}
          getDirectUrl={getDirectUrl}
          setActiveVideo={setActiveVideo}
          setListeningTo={setListeningTo}
          getViewsString={getViewsString}
        />
      )}

      {page === menu.SEARCH && (
        <div className="container">
          <Cards
            arrayLoading={arrayLoading}
            searchArray={searchArray}
            viewingChannel={viewingChannel}
            getDirectUrl={getDirectUrl}
            setActiveVideo={setActiveVideo}
            setListeningTo={setListeningTo}
            addToHistory={addToHistory}
            notify={notify}
            getPlaylistVideos={getPlaylistVideos}
            addToQueue={addToQueue}
            getViewsString={getViewsString}
          />
        </div>
      )}

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

      <BottomMenu
        menu={menu}
        page={page}
        setPage={setPage}
        listHistory={listHistory}
        history={history}
        magnifier={magnifier}
        library={library}
      />

      <AudioShelf
        directUrl={directUrl}
        audioLoading={audioLoading}
        scrollingDown={scrollingDown}
        listeningTo={listeningTo}
        replay={replay}
        notify={notify}
        expanded={expanded}
        setExpanded={setExpanded}
        playlist={playlist}
        setListeningTo={setListeningTo}
        activeVideo={activeVideo}
        setActiveVideo={setActiveVideo}
        getViewsString={getViewsString}
        audioPlayerRef={audioPlayerRef}
        getDirectUrl={getDirectUrl}
      />
    </>
  );
}

export default App;

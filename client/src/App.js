import React, { useState, useRef, useEffect, useCallback } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import qs from "query-string";

import storage from "./localStorage";
import recognizeAndStartSearch from "./speechRecognition";
import copyToClipboard from "./copyToClipboard";
import Notification from "./components/Notification";
import "./App.css";

import replay5 from "./icons/replay5.png";
import replay10 from "./icons/replay10.png";
import replay30 from "./icons/replay30.png";
import forward5 from "./icons/forward5.png";
import forward10 from "./icons/forward10.png";
import forward30 from "./icons/forward30.png";
import chevron from "./icons/chevron.png";
import addToQueueIcon from "./icons/addToQueue.png";
import menuVertical from "./icons/menuVertical.png";
import playButton from "./icons/playButton.png";
import share from "./icons/share.png";
import magnifier from "./icons/magnifier.png";
import history from "./icons/history.png";
import library from "./icons/library.png";
import microphone from "./icons/microphone.png";

let preventBlur = false;

const defaultPuppyImg =
  "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=1.00xw:0.669xh;0,0.190xh&resize=1200:*";

const debounce = (func, wait) => {
  var timeout;
  return function (arg) {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      timeout = null;
      func(arg);
    }, wait);
  };
};

function throttle(callback, limit) {
  let waiting = false;
  let finalTimeout = false;
  return function (...args) {
    if (!waiting) {
      clearTimeout(finalTimeout);
      callback();
      waiting = true;
      setTimeout(function () {
        waiting = false;
      }, limit);
    } else {
      clearTimeout(finalTimeout);
      finalTimeout = setTimeout(callback, limit / 2);
    }
  };
}

const checkScroll = (setScrollingDown) => {
  let oldScroll = 0;

  return () => {
    if (window.scrollY > oldScroll) {
      console.log("down");
      setScrollingDown(true);
    } else {
      console.log("up");
      setScrollingDown(false);
    }
    oldScroll = window.scrollY;
  };
};

function App() {
  const [directUrl, setDirectUrl] = useState(null);
  const [audioLoading, setAudioLoading] = useState(false);
  const [arrayLoading, setArrayLoading] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [searchString, setSearchString] = useState("");
  const [searchArray, setSearchArray] = useState([]);
  const [viewingChannel, setViewingChannel] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const audioPlayerRef = useRef();
  const [playlist, setPlaylist] = useState([]);
  const [activeVideo, setActiveVideo] = useState(null);
  const [listeningTo, setListeningTo] = useState(null);
  const [info, setInfo] = useState(null);
  const [suggestions, setSuggestions] = useState({ show: false, array: [] });
  const [scrollingDown, setScrollingDown] = useState(false);
  const [browsingHistory, setBrowsingHistory] = useState(null);

  const location = useLocation();
  const [alert, setAlert] = useState(qs.parse(location.search));

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
    window.addEventListener("mouseup", () => {
      if (preventBlur) {
        preventBlur = false;
        setSuggestions((suggestions) => ({ ...suggestions, show: false }));
      }
    });
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
      <div className="searchBoxFixedContainer">
        <div
          className={`searchBoxContainer ${scrollingDown ? "collapsed" : ""}`}
        >
          <div className="notificationsContainer">
            {notifications.map((notification) => (
              <Notification notification={notification} />
            ))}
          </div>
          <form
            className="searchBox"
            name="searchForm"
            ref={searchForm}
            onSubmit={searchYoutube}
          >
            <input
              className="input"
              value={searchString}
              onChange={handleInput}
              ref={input}
              onClick={() => {
                setSuggestions({ ...suggestions, show: true });
              }}
              onFocus={() => {
                setSuggestions({ ...suggestions, show: true });
              }}
              onBlur={() => {
                console.log(preventBlur);
                if (!preventBlur)
                  setSuggestions({ ...suggestions, show: false });
              }}
            ></input>

            {suggestions.show && !!suggestions.array.length && (
              <div className="suggestionsContainer">
                {suggestions.array.map((suggestionString) => (
                  <div
                    className="suggestion"
                    onMouseDown={(e) => {
                      preventBlur = true;
                    }}
                    onMouseUp={(e) => {
                      // eslint-disable-next-line no-unused-vars
                      preventBlur = false;
                      setSearchString(suggestionString);
                      if (!preventBlur) searchYoutube(e, suggestionString);
                    }}
                  >
                    {suggestionString}
                  </div>
                ))}
              </div>
            )}
            <button className="button" type="submit">
              <img src={magnifier} alt="alt" />
            </button>
            <div
              className="button microphone"
              onClick={recognizeAndStartSearch(startSearch, notify)}
            >
              <img src={microphone} alt="alt" />
            </div>
          </form>
        </div>
      </div>
      <div className="container">
        {process.env.NODE_ENV === "development" && (
          <>
            {/* <pre>
              {JSON.stringify(
                { searchString, suggestions, preventBlur },
                null,
                2
              )}
            </pre> */}
            <pre style={{ position: "fixed", left: 0, top: "5rem" }}>
              {scrollingDown.toString()}
            </pre>
          </>
        )}

        {browsingHistory && (
          <table id="customers">
            <thead>
              <tr>
                <th>
                  <div className="indexContainer">
                    <span>{"#"}</span>
                  </div>
                </th>
                <th>
                  <p>{"Title & metadata"}</p>
                </th>
              </tr>
            </thead>
            <tbody>
              {browsingHistory.map((video, index) => (
                <tr
                  className={`${activeVideo === index ? "activeVideo" : ""}`}
                  onClick={() => {
                    getDirectUrl(video.url);
                    setActiveVideo(index);
                    setListeningTo(video);
                  }}
                >
                  <td>
                    <div className="indexContainer">
                      <span className="index">{index}</span>
                      <div className="playButton">
                        <span>
                          <img src={playButton} alt="X" />
                        </span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="tableRowInfo">
                      <div className={"playlist title"}>
                        <p>{video.title}</p>
                      </div>
                      <div className={"playlist metadata"}>
                        <p>{video.author?.name}</p>•
                        <p>{getViewsString(video.views)}</p>•
                        <p>{video.duration}</p>•<p>{video.uploadedAt}</p>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {!!location.search && (
          <div className={`alertBox ${alert ? "appear" : ""}`}>
            <p>Hello there man, somebody sent you a song you need to check!</p>
            <div className="alertMessageContainer">
              {info ? (
                <span className="alertMessage">{info.title}</span>
              ) : (
                <div className="loading audio">
                  <div className="miniloader" />
                </div>
              )}
            </div>

            <button
              className="button small"
              onClick={() => {
                getDirectUrl(info.url);
                setListeningTo(info);
                notify(`Listening to: ${info.title}`);
                setAlert(null);
              }}
            >
              Let it hit the speakers!
            </button>
          </div>
        )}

        {viewingChannel && (
          <p
            style={{
              margin: "2rem 2rem 0rem",
              fontSize: "1.2rem",
              fontWeight: "bold",
            }}
          >
            Videos from channel {viewingChannel}:
          </p>
        )}
        <div className="cardContainer">
          {arrayLoading && (
            <div className="loading array">
              <div className="loader" />
            </div>
          )}
          {searchArray
            .filter(
              ({ type }) =>
                type === "video" || type === "channel" || !!viewingChannel
            )
            .map((item, i) => {
              const {
                url,
                title,
                thumbnails,
                duration,
                uploadedAt,
                author,
                views,
                type,
                bestAvatar,
                name,
                subscribers,
              } = item;

              return type === "video" || viewingChannel ? (
                <div className="card" key={i}>
                  <div
                    onClick={() => {
                      getDirectUrl(url);
                      setActiveVideo(null);
                      setListeningTo(item);
                      addToHistory(item);
                      notify(`Listening to: ${item.title}`);
                    }}
                    className="thumbnail"
                    style={{
                      background: `url(${
                        thumbnails
                          ? thumbnails[thumbnails.length - 1]?.url
                          : defaultPuppyImg
                      })`,
                      backgroundPosition: "center",
                      backgroundSize: "cover",
                    }}
                  />
                  <div className="descContainer">
                    <p className="desc title">
                      {`${title.substring(0, 40)}${
                        title.length > 40 ? "..." : ""
                      }`}
                    </p>
                    {!viewingChannel && (
                      <>
                        <div className="channelDescAndPlaylist">
                          <div className="channelDesc">
                            <div
                              className="authorThumbnail"
                              onClick={(event) => {
                                getPlaylistVideos(event, author.url);
                              }}
                              style={{
                                backgroundImage: `url(${
                                  author?.avatars
                                    ? author.avatars[author.avatars.length - 1]
                                        ?.url
                                    : defaultPuppyImg
                                })`,
                              }}
                            />
                            <div className="desc channelName">
                              <p>{author?.name || "Name not found"}</p>
                            </div>
                          </div>
                          <div style={{ display: "flex" }}>
                            <div
                              className="addToPlaylistIcon"
                              onClick={() => {
                                addToQueue(item);
                                notify("Added to playing queue");
                              }}
                            >
                              <img src={addToQueueIcon} alt="loading"></img>
                            </div>
                            <div
                              className="addToPlaylistIcon"
                              onClick={() => {}}
                            >
                              <img src={menuVertical} alt="loading"></img>
                            </div>
                          </div>
                        </div>

                        <div className="metadata">
                          <p className="desc">
                            {views
                              ? `${getViewsString(views)} views`
                              : "Views not available"}
                          </p>
                          •
                          <p className="desc">
                            {duration || "Duration not available"}
                          </p>
                          •
                          <p className="desc">
                            {uploadedAt || "Uploaded date not available"}
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              ) : (
                <div className="card channel" key={i}>
                  <div
                    className="thumbnail"
                    onClick={(event) => {
                      getPlaylistVideos(event, url);
                    }}
                  >
                    <img
                      src={bestAvatar.url || defaultPuppyImg}
                      className="thumbnail"
                      alt="thumbnail"
                    />
                  </div>
                  <div className="descContainer">
                    <p className="desc title">{name}</p>
                    <p className="desc">
                      {subscribers || "Subscribers not available"}
                    </p>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
      <div className="bottomMenu">
        <div
          className="icon"
          onClick={() => {
            listHistory();
          }}
        >
          <img src={history} alt="alt"></img>
        </div>
        <div className="icon active">
          <img src={magnifier} alt="alt"></img>
        </div>
        <div className="icon">
          <img src={library} alt="alt"></img>
        </div>
      </div>
      <div
        className={`audioShelf ${
          (directUrl || audioLoading) && !scrollingDown ? "" : "closed"
        } ${expanded ? "opened" : ""}`}
      >
        {listeningTo && (
          <div className="currentlyPlaying">
            <p>
              <span>Currently playing:</span>{" "}
              <span style={{ fontStyle: "italic", fontWeight: 600 }}>
                {listeningTo.title}
              </span>
            </p>
          </div>
        )}
        <div className="audioPlayerContainer">
          <div className="audioControls">
            <div className="audioButton" onClick={replay(-30)}>
              <img src={replay30} alt="loading" />
            </div>
            <div className="audioButton" onClick={replay(-10)}>
              <img src={replay10} alt="loading" />
            </div>
            <div className="audioButton" onClick={replay(-5)}>
              <img src={replay5} alt="loading" />
            </div>
            <div className="audioButton" onClick={replay(5)}>
              <img src={forward5} alt="loading" />
            </div>
            <div className="audioButton" onClick={replay(10)}>
              <img src={forward10} alt="loading" />
            </div>
            <div className="audioButton" onClick={replay(30)}>
              <img src={forward30} alt="loading" />
            </div>
            <div style={{ borderLeft: "1px solid black" }}></div>
            <div
              className="audioButton"
              onClick={() => {
                copyToClipboard(
                  `${
                    process.env.NODE_ENV === "production"
                      ? "https://podkaster2.herokuapp.com"
                      : "localhost:3000"
                  }?id=${listeningTo.id}`
                );
                notify("Sharing link copied to clipboard!");
              }}
            >
              <img src={share} alt="loading" />
            </div>

            {!!playlist.length && (
              <div
                className={`audioButton close ${expanded ? "expanded" : ""}`}
                onClick={() => setExpanded(!expanded)}
              >
                <img src={chevron} alt="loading" />
              </div>
            )}
          </div>

          <div className="audioPlayer">
            {audioLoading ? (
              <div className="loading audio">
                <div className="miniloader" />
              </div>
            ) : (
              <audio ref={audioPlayerRef} controls autoPlay>
                <source src={directUrl} type="audio/webm" />
              </audio>
            )}
          </div>
        </div>
        {!!playlist.length && (
          <table id="customers">
            <thead>
              <tr>
                <th>
                  <div className="indexContainer">
                    <span>{"#"}</span>
                  </div>
                </th>
                <th>
                  <p>{"Title & metadata"}</p>
                </th>
              </tr>
            </thead>
            <tbody>
              {playlist.map((video, index) => (
                <tr
                  className={`${activeVideo === index ? "activeVideo" : ""}`}
                  onClick={() => {
                    getDirectUrl(video.url);
                    setActiveVideo(index);
                    setListeningTo(video);
                  }}
                >
                  <td>
                    <div className="indexContainer">
                      <span className="index">{index}</span>
                      <div className="playButton">
                        <span>
                          <img src={playButton} alt="X" />
                        </span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="tableRowInfo">
                      <div className={"playlist title"}>
                        <p>{video.title}</p>
                      </div>
                      <div className={"playlist metadata"}>
                        <p>{video.author?.name}</p>•
                        <p>{getViewsString(video.views)}</p>•
                        <p>{video.duration}</p>•<p>{video.uploadedAt}</p>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}

export default App;

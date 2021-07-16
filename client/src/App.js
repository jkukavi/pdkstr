import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import qs from "query-string";

import copyToClipboard from "./copyToClipboard";
import "./App.css";

import replay5 from "./icons/replay5.png";
import replay10 from "./icons/replay10.png";
import replay30 from "./icons/replay30.png";
import forward5 from "./icons/forward5.png";
import forward10 from "./icons/forward10.png";
import forward30 from "./icons/forward30.png";
import chevron from "./icons/chevron.png";
import playlistIcon from "./icons/playlist.png";
import playButton from "./icons/playButton.png";
import share from "./icons/share.png";
import magnifier from "./icons/magnifier.png";

const defaultPuppyImg =
  "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=1.00xw:0.669xh;0,0.190xh&resize=1200:*";

function App() {
  const [directUrl, setDirectUrl] = useState(null);
  const [audioLoading, setAudioLoading] = useState(false);
  const [arrayLoading, setArrayLoading] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [searchString, setSearchString] = useState("");
  const [searchArray, setSearchArray] = useState([]);
  const [viewingChannel, setViewingChannel] = useState(false);
  const audioPlayerRef = useRef();
  const [playlist, setPlaylist] = useState([]);
  const [activeVideo, setActiveVideo] = useState(null);
  const [listeningTo, setListeningTo] = useState(null);
  const [info, setInfo] = useState(null);

  const location = useLocation();
  const [alert, setAlert] = useState(qs.parse(location.search));

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

  const searchYoutube = async (event) => {
    event.preventDefault();
    setSearchArray([]);
    setArrayLoading(true);
    setViewingChannel(false);
    try {
      const response = await axios.post("/search", {
        searchString,
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

  const addToPlaylist = (video) => {
    setPlaylist([...playlist, video]);
  };

  return (
    <>
      <div className="container">
        {!!location.search && (
          <div className={`alertBox ${alert ? "appear" : ""}`}>
            <div className="alert">
              <p>
                Hello there man, somebody sent you a song you need to check!
              </p>
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
                  setAlert(null);
                }}
              >
                Let it hit the speakers!
              </button>
            </div>
          </div>
        )}
        <div className="searchBoxContainer">
          <form className="searchBox">
            <input
              className="input"
              value={searchString}
              onChange={handleInput}
            ></input>
            <button className="button" onClick={searchYoutube}>
              <img src={magnifier} alt="alt" />
            </button>
          </form>
        </div>

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
                          <div
                            className="addToPlaylistIcon"
                            onClick={() => addToPlaylist(item)}
                          >
                            <img src={playlistIcon} alt="loading"></img>
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
      <div
        className={`audioShelf ${directUrl || audioLoading ? "" : "closed"} ${
          expanded ? "opened" : ""
        }`}
      >
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
                  `https://podkaster2.herokuapp.com?id=${listeningTo.id}`
                );
                window.alert("Copied to clipboard!");
              }}
            >
              <img src={share} alt="loading" />
            </div>

            <div
              className={`audioButton close ${expanded ? "expanded" : ""}`}
              onClick={() => setExpanded(!expanded)}
            >
              <img src={chevron} alt="loading" />
            </div>
          </div>

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
      </div>
    </>
  );
}

export default App;

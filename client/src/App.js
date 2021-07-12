import React, { useState, useRef } from "react";
import "./App.css";
import axios from "axios";
import loadingGif from "./giphy.webp";
import replay5 from "./icons/replay5.png";
import replay10 from "./icons/replay10.png";
import replay30 from "./icons/replay30.png";
import forward5 from "./icons/forward5.png";
import forward10 from "./icons/forward10.png";
import forward30 from "./icons/forward30.png";
import chevron from "./icons/chevron.png";

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
      prompt("some error happened");
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
  return (
    <>
      <div className="container">
        <form className="form">
          <input
            className="input"
            value={searchString}
            onChange={handleInput}
          ></input>
          <button className="button" onClick={searchYoutube}>
            Search
          </button>
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
                <img src={loadingGif} alt="loading" />
              </div>
            )}
            {searchArray
              .filter(
                ({ type }) =>
                  type === "video" || type === "channel" || !!viewingChannel
              )
              .map(
                (
                  {
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
                  },
                  i
                ) => {
                  return type === "video" || viewingChannel ? (
                    <div className="card" key={i}>
                      <div
                        onClick={() => getDirectUrl(url)}
                        className="thumbnail"
                      >
                        <img
                          src={
                            thumbnails
                              ? thumbnails[thumbnails.length - 1]?.url
                              : defaultPuppyImg
                          }
                          className="thumbnail"
                          alt="thumbnail"
                        />
                      </div>

                      <div className="descContainer">
                        <p className="desc title">
                          {`${title.substring(0, 40)}${
                            title.length > 40 ? "..." : ""
                          }`}
                        </p>
                        {!viewingChannel && (
                          <>
                            <div className="channelDesc">
                              <div
                                className="authorThumbnail"
                                onClick={(event) => {
                                  getPlaylistVideos(event, author.url);
                                }}
                                style={{
                                  backgroundImage: `url(${
                                    author?.avatars
                                      ? author.avatars[
                                          author.avatars.length - 1
                                        ]?.url
                                      : defaultPuppyImg
                                  })`,
                                }}
                              />
                              <div className="desc channelName">
                                <p>{author?.name || "Name not found"}</p>
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
                          {subscribers || "Views not available"}
                        </p>
                      </div>
                    </div>
                  );
                }
              )}
          </div>
        </form>
      </div>
      <div
        className={`audioContainer ${
          directUrl || audioLoading ? "" : "closed"
        } ${expanded ? "opened" : ""}`}
      >
        {directUrl && (
          <div className="audioPlayer">
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
            </div>
            <audio ref={audioPlayerRef} controls>
              <source src={directUrl} type="audio/webm" />
            </audio>
            <div
              className={`audioButton close ${expanded ? "expanded" : ""}`}
              onClick={() => setExpanded(!expanded)}
            >
              <img src={chevron} alt="loading" />
            </div>
          </div>
        )}
        {audioLoading && (
          <div className="loading">
            <img src={loadingGif} alt="loading" />
          </div>
        )}
      </div>
    </>
  );
}

export default App;

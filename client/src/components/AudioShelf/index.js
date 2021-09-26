import React, { useEffect, useState } from "react";

import Table from "../Table";
import Player from "../Player";

import replay5 from "../../icons/replay5.png";
import replay10 from "../../icons/replay10.png";
import replay30 from "../../icons/replay30.png";
import forward5 from "../../icons/forward5.png";
import forward10 from "../../icons/forward10.png";
import forward30 from "../../icons/forward30.png";
import share from "../../icons/share.png";

import { SearchEngineIcon, searchEngineShortcuts } from "../../consts";
import { getPlaylistItems } from "../../apiCalls";

import { v4 as uuid } from "uuid";

import copyToClipboard from "../../helpers/copyToClipboard";
import { getViewsString, addRandomKey } from "../../helpers/helpers";
import speak from "../../helpers/speak";
import { paths, searchEngines } from "../../consts";

import { addToHistory } from "../../apiCalls";
import { notify } from "../Notifications";

import { instance as axios } from "../../contexts/axiosInstance";

import ExpansionContainer, { ExpandButton } from "./ExpansionContainer";

export const AudioPlayer = {
  getDirectUrl: null,
  playPlaylist: null,
  setActiveVideo: null,
  setListeningTo: null,
  addToQueue: null,
  listeningTo: null,
  activeVideo: null,
  subscribe: (fn) => {
    const id = uuid();
    AudioPlayer.subscribers.push({ fn, id: id });
    return id;
  },
  unsubscribe: (id) => {
    const index = AudioPlayer.subscribers.findIndex((item) => item.id === id);
    if (index) AudioPlayer.subscribers.splice(index, 1);
  },
  subscribers: [],
};

const notifySubscribers = (listeningTo) => {
  for (const subscribers of AudioPlayer.subscribers) {
    subscribers.fn(listeningTo);
  }
};

const AudioShelf = () => {
  const [directUrl, setDirectUrl] = useState(null);
  const [audioLoading, setAudioLoading] = useState(false);
  const [playlist, setPlaylist] = useState([]);
  const [listeningTo, setListeningTo] = useState(null);
  const [activeVideo, setActiveVideo] = useState(null);

  useEffect(() => {
    AudioPlayer.getDirectUrl = getDirectUrl;
    AudioPlayer.playPlaylist = playPlaylist;
    AudioPlayer.setActiveVideo = setActiveVideo;
    AudioPlayer.setListeningTo = setListeningTo;
    AudioPlayer.addToQueue = addToQueue;
    AudioPlayer.listeningTo = listeningTo;
    AudioPlayer.activeVideo = activeVideo;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setDirectUrl, setAudioLoading, setPlaylist, setActiveVideo, activeVideo]);

  useEffect(() => notifySubscribers(listeningTo), [listeningTo]);

  const onAudioEnded = () => {
    playNext();
  };

  const replay = (time) => () => {
    const audioPlayer = document.getElementById("my-audio");
    audioPlayer.currentTime = audioPlayer.currentTime + time;
  };

  const getDirectUrl = async ({ id, engine, url }) => {
    setDirectUrl(null);
    setAudioLoading(true);
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

  return (
    <ExpansionContainer
      directUrl={directUrl}
      audioLoading={audioLoading}
      playlist={playlist}
    >
      <div className="audioPlayerContainer">
        <>
          {audioLoading ? (
            <div className="loading audio">
              <div className="miniloader" />
            </div>
          ) : (
            directUrl && (
              <>
                <Player
                  audioPlayer={
                    <audio
                      style={{ display: "none" }}
                      id="my-audio"
                      onEnded={onAudioEnded}
                      controls
                      autoPlay
                    >
                      <source src={directUrl} type="audio/webm" />
                      <source
                        src={`proxy/${encodeURIComponent(directUrl)}`}
                        type="audio/webm"
                      />
                    </audio>
                  }
                  currentlyPlaying={
                    listeningTo && (
                      <div
                        style={{
                          lineHeight: "12px",
                          width: "calc(100% - 6.5rem)",
                        }}
                      >
                        <span style={{ fontSize: "12px" }}>
                          Currently playing:{" "}
                        </span>
                        <br />

                        <div
                          style={{
                            fontStyle: "italic",
                            fontWeight: 600,
                            fontSize: "12px",
                            overflow: "hidden",
                            whiteSpace: "nowrap",
                            textOverflow: "ellipsis",
                          }}
                        >
                          <SearchEngineIcon engine={listeningTo.engine} />
                          {listeningTo.title}
                        </div>
                      </div>
                    )
                  }
                />
                <div id="audioControls" className="audioControls">
                  <div className="audioButton" onClick={replay(-30)}>
                    <img src={replay30} alt="loading" />
                  </div>
                  <div className="audioButton" onClick={replay(-10)}>
                    <img src={replay10} alt="loading" />
                  </div>
                  <div className="audioButton" onClick={replay(-5)}>
                    <img src={replay5} alt="loading" />
                  </div>
                  <button
                    id="playButton"
                    className="audioButton noFlash"
                  ></button>
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
                        }?id=${searchEngineShortcuts[listeningTo.engine]}.${
                          listeningTo.id
                        }`
                      );
                      notify("Sharing link copied to clipboard!");
                    }}
                  >
                    <img src={share} alt="loading" />
                  </div>
                  {!!playlist.length && <ExpandButton />}
                </div>
              </>
            )
          )}
        </>
      </div>
      {!!playlist.length && (
        <div
          style={{
            marginLeft: "calc(50% - 0.5rem)",
            transform: "translate(-100%)",
          }}
        >
          <Table
            tableTitle="Playing queue"
            notify={notify}
            tableArray={playlist}
            activeVideo={activeVideo}
            deleteAll={() => setPlaylist([])}
            listeningTo={listeningTo}
            getDirectUrl={getDirectUrl}
            setActiveVideo={setActiveVideo}
            setListeningTo={setListeningTo}
            getViewsString={getViewsString}
          />
        </div>
      )}
    </ExpansionContainer>
  );
};

export default AudioShelf;

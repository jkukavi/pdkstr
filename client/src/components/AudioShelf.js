import React from "react";

import copyToClipboard from "../helpers/copyToClipboard";

import Table from "./Table";
import Player from "./Player";

import replay5 from "../icons/replay5.png";
import replay10 from "../icons/replay10.png";
import replay30 from "../icons/replay30.png";
import forward5 from "../icons/forward5.png";
import forward10 from "../icons/forward10.png";
import forward30 from "../icons/forward30.png";
import share from "../icons/share.png";
import playingQueue from "../icons/playingQueue.png";
import chevron from "../icons/chevron.png";
import { SearchEngineIcon, searchEngineShortcuts } from "../consts/index.js";

// import bla from "./Player/bla.mp3";

const AudioShelf = ({
  directUrl,
  audioLoading,
  scrollingDown,
  listeningTo,
  notify,
  expanded,
  setExpanded,
  playNext,
  playlist,
  setListeningTo,
  activeVideo,
  setActiveVideo,
  setPlaylist,
  getViewsString,
  audioPlayerRef,
  getDirectUrl,
}) => {
  const onAudioEnded = () => {
    playNext();
  };

  const replay = (time) => () => {
    const audioPlayer = document.getElementById("my-audio");
    audioPlayer.currentTime = audioPlayer.currentTime + time;
  };

  return (
    <div
      className={`audioShelf ${
        (directUrl || audioLoading) && !scrollingDown ? "" : "closed"
      } ${expanded ? "opened" : ""}`}
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

                  {!!playlist.length && (
                    <div
                      className={`audioButton close ${
                        expanded ? "expanded" : ""
                      }`}
                      onClick={() => setExpanded(!expanded)}
                    >
                      <img
                        src={expanded ? chevron : playingQueue}
                        alt="loading"
                      />
                    </div>
                  )}
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
    </div>
  );
};

export default AudioShelf;

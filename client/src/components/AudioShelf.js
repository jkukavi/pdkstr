import React from "react";

import copyToClipboard from "../copyToClipboard";

import Table from "./Table";

import replay5 from "../icons/replay5.png";
import replay10 from "../icons/replay10.png";
import replay30 from "../icons/replay30.png";
import forward5 from "../icons/forward5.png";
import forward10 from "../icons/forward10.png";
import forward30 from "../icons/forward30.png";
import share from "../icons/share.png";
import playingQueue from "../icons/playingQueue.png";
import chevron from "../icons/chevron.png";

const AudioShelf = ({
  directUrl,
  audioLoading,
  scrollingDown,
  listeningTo,
  replay,
  notify,
  expanded,
  setExpanded,
  playlist,
  setListeningTo,
  activeVideo,
  setActiveVideo,
  getViewsString,
  audioPlayerRef,
  getDirectUrl,
}) => {
  return (
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
              <img src={expanded ? chevron : playingQueue} alt="loading" />
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
        <Table
          tableTitle="Playing queue"
          notify={notify}
          tableArray={playlist}
          activeVideo={activeVideo}
          getDirectUrl={getDirectUrl}
          setActiveVideo={setActiveVideo}
          setListeningTo={setListeningTo}
          getViewsString={getViewsString}
        />
      )}
    </div>
  );
};

export default AudioShelf;

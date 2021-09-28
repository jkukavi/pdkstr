import React from "react";

import Player from "../Player";

import replay5 from "../../icons/replay5.png";
import replay10 from "../../icons/replay10.png";
import replay30 from "../../icons/replay30.png";
import forward5 from "../../icons/forward5.png";
import forward10 from "../../icons/forward10.png";
import forward30 from "../../icons/forward30.png";
import share from "../../icons/share.png";

import copyToClipboard from "../../helpers/copyToClipboard";
import { SearchEngineIcon, searchEngineShortcuts } from "../../consts";

import { ExpandButton } from "./ExpandableContainer";

import { notify } from "../Notifications";

const AudioPlayerComponent = ({
  onAudioEnded,
  directUrl,
  listeningTo,
  replay,
  playlist,
  audioLoading,
}) => {
  if (audioLoading)
    return (
      <div className="loading audio">
        <div className="miniloader" />
      </div>
    );

  return (
    <div className="audioPlayerContainer">
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
              <span style={{ fontSize: "12px" }}>Currently playing: </span>
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
        <button id="playButton" className="audioButton noFlash"></button>
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
    </div>
  );
};

export default AudioPlayerComponent;

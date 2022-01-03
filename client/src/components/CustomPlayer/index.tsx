import React, { useEffect } from "react";
import "./index.css";
import PlayerControls from "./PlayerControls";

import { init, initDefault } from "./init";

const isPointerSupported = (() => {
  let isPointerSupported;

  try {
    new PointerEvent("");
    isPointerSupported = true;
  } catch {
    isPointerSupported = false;
  }

  return isPointerSupported;
})();

const Player = ({
  currentlyPlaying,
  children: sources,
  ...audioProps
}: {
  currentlyPlaying: JSX.Element;
  children: React.ReactNode;
} & React.DetailedHTMLProps<
  React.AudioHTMLAttributes<HTMLAudioElement>,
  HTMLAudioElement
>) => {
  useEffect(() => {
    if (!isPointerSupported) {
      const cleanup = initDefault();
      return cleanup;
    } else {
      const cleanup = init();
      return cleanup;
    }
  }, []);

  if (!isPointerSupported) {
    return (
      <>
        <audio id="my-audio" {...audioProps} style={{ height: "40px" }}>
          {sources}
        </audio>
        <PlayerControls />
      </>
    );
  }

  return (
    <>
      <div style={{ display: "none" }}>
        {
          <audio id="my-audio" {...audioProps}>
            {sources}
          </audio>
        }
      </div>

      <div id="player">
        <div className="playerInfo">
          {currentlyPlaying && (
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
                  height: "20px",
                  overflowX: "hidden",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                }}
              >
                {currentlyPlaying}
              </div>
            </div>
          )}
          <div
            style={{
              whiteSpace: "nowrap",
              color: "#c1c1c1",
            }}
          >
            <span id="currentTime">00:00</span>
            <span>/</span>
            <span id="duration">00:00</span>
          </div>
        </div>
        <div className="barContainer noFlash">
          <div id="barHolder" className="noTouchAction">
            <div className="bars">
              <div className="progress bar"></div>
              <div className="buffer bar"></div>
              <div className="norm bar"></div>
            </div>
            <div id="circleHolder">
              <div className="circle" />

              <div id="cancelSeek" className="noFlash">
                <span className="currentTime">00:00</span>
                <div className="button" />
                <span className="duration">00:00</span>
                <div className="dropOverlay"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <PlayerControls />
    </>
  );
};

export default Player;

import React, { useEffect } from "react";
import "./index.css";

import init from "./init";

const Player = ({ audioPlayer, currentlyPlaying }) => {
  useEffect(() => {
    const cleanup = init();
    return cleanup;
  }, []);

  return (
    <>
      {audioPlayer}
      <div id="player">
        <div className="playerInfo">
          {currentlyPlaying}
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Player;

import React from "react";
import chevron from "icons/chevron.svg";
import magnifier from "icons/magnifier.svg";
import microphone from "icons/microphone.svg";

import recognizeAndStartSearch from "helpers/speechRecognition";

export const GoBackButton = ({ onClick }: { onClick: VoidFunction }) => {
  return (
    <button
      className="button microphone"
      type="button"
      style={{ padding: 0 }}
      onClick={onClick}
    >
      <img src={chevron} alt="alt" style={{ transform: "rotate(90deg)" }} />
    </button>
  );
};

export const StartSearchButton = () => (
  <button className="button search" type="submit">
    <img src={magnifier} alt="alt" />
  </button>
);

export const VoiceSearchButton = () => (
  <div className="button microphone" onClick={recognizeAndStartSearch()}>
    <img src={microphone} alt="alt" />
  </div>
);

export const ShowInputButton = ({ onClick }: { onClick: VoidFunction }) => (
  <button className="button microphone" type="button" onClick={onClick}>
    <img src={magnifier} alt="alt" />
  </button>
);

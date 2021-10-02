import chevron from "../../../../icons/chevron.png";
import magnifier from "../../../../icons/magnifier.png";
import microphone from "../../../../icons/microphone.png";

import recognizeAndStartSearch from "../../../../helpers/speechRecognition";

export const GoBackButton = ({ onClick }) => {
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

export const ShowInputButton = ({ onClick }) => (
  <button className="button microphone" type="button" onClick={onClick}>
    <img src={magnifier} alt="alt" />
  </button>
);

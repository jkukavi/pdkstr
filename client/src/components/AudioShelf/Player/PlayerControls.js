import replay5 from "../../../icons/replay5.png";
import replay10 from "../../../icons/replay10.png";
import replay30 from "../../../icons/replay30.png";
import forward5 from "../../../icons/forward5.png";
import forward10 from "../../../icons/forward10.png";
import forward30 from "../../../icons/forward30.png";

import { ExpandButton } from "../ExpandableContainer";

const replay = (time) => () => {
  const audioPlayer = document.getElementById("my-audio");
  audioPlayer.currentTime = audioPlayer.currentTime + time;
};

const PlayerControls = () => {
  return (
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
      <ExpandButton />
    </div>
  );
};

export default PlayerControls;

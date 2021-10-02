import { PlayingQueue } from "../AudioShelf/PlayingQueue";
import playButtonThumbnail from "../../icons/playButtonThumbnail.svg";
import chevron from "../../icons/chevron.png";

const Controls = ({ closeBrowsingPlaylist, browsingPlaylist }) => (
  <>
    <div
      style={{ cursor: "pointer", width: "20px", height: "20px" }}
      onClick={() => closeBrowsingPlaylist()}
    >
      <img
        style={{
          transform: "rotate(-90deg)",
          filter: "invert(1)",
          width: "100%",
          height: "100%",
        }}
        src={chevron}
        alt="alt"
      />
    </div>
    <div
      style={{
        cursor: "pointer",
        margin: "auto",
        width: "20px",
        height: "20px",
      }}
      onClick={() => {
        closeBrowsingPlaylist();
        PlayingQueue.playPlaylist(browsingPlaylist.info);
      }}
    >
      <img
        style={{ width: "100%", height: "100%" }}
        src={playButtonThumbnail}
        alt="alt"
      />
    </div>
  </>
);
export default Controls;

import youtube from "icons/youtube.svg";
import soundcloud from "icons/soundcloud.svg";

export const menu = {
  SEARCH: "/",
  HISTORY: "/history",
  LIBRARY: "/library",
};

type Paths = {
  [key: string]: {
    [key in Engine]: string;
  };
};

export const paths: Paths = {
  search: {
    youtube: "/search/youtube",
    soundcloud: "/search/soundcloud",
  },
  directUrl: {
    youtube: "/url/youtube",
    soundcloud: "/url/soundcloud",
  },
  playlistItems: {
    youtube: "/playlist/youtube",
    soundcloud: "/playlist/soundcloud",
  },
  trackInfo: {
    youtube: "/info",
    soundcloud: "soundcloud/info",
  },
  channelItems: {
    youtube: "/youtube/channel/items",
    soundcloud: "/soundcloud/channel/items",
  },
  channelPlaylists: {
    youtube: "/youtube/channel/playlists",
    soundcloud: "/soundcloud/channel/playlists",
  },
  ping: {
    youtube: "/ping/youtube",
    soundcloud: "/ping/soundcloud",
  },
};

export const buttonTextBySearchEngine: {
  [key in Engine]: { items: string; playlists: string };
} = {
  youtube: {
    items: "Videos",
    playlists: "Playlists",
  },
  soundcloud: {
    items: "Tracks",
    playlists: "Playlists",
  },
};

const searchEngineImageSource: {
  [key in Engine]: string;
} = {
  youtube: youtube,
  soundcloud: soundcloud,
};

export const SearchEngineIcon = ({
  engine,
  size = "s",
}: {
  engine: Engine;
  size?: "s" | "m";
}) => {
  const pixels = {
    s: "16px",
    m: "30px",
  }[size];
  return (
    <span style={{ display: "inline", padding: "0 2px" }} className="icon">
      <img
        style={{
          width: pixels,
          height: pixels,
          position: "relative",
          top: "2px",
        }}
        src={searchEngineImageSource[engine]}
        alt="alt"
      ></img>
    </span>
  );
};

export const defaultPuppyImg =
  "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=1.00xw:0.669xh;0,0.190xh&resize=1200:*";

export const favouritesFilters = {
  TRACKS: "video",
  PLAYLISTS: "playlist",
  CHANNELS: "channel",
};

export const favouritesFilterNames = {
  [favouritesFilters.TRACKS]: "Tracks",
  [favouritesFilters.PLAYLISTS]: "Playlists",
  [favouritesFilters.CHANNELS]: "Channels",
};

export const allowedCardTypes = ["video", "playlist", "channel"];

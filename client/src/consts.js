import youtube from "./icons/youtube.png";
import soundcloud from "./icons/soundcloud.png";
import React from "react";

export const menu = {
  SEARCH: "search",
  HISTORY: "history",
  LIBRARY: "library",
};

export const searchEngines = {
  YT: "youtube",
  SC: "soundcloud",
};

export const paths = {
  search: {
    [searchEngines.YT]: "/search",
    [searchEngines.SC]: "/soundcloud/tracks",
  },
  directUrl: {
    [searchEngines.YT]: "/url",
    [searchEngines.SC]: "/soundcloud/url",
  },
  playlist: {
    [searchEngines.YT]: "/playlist",
    [searchEngines.SC]: "soundcloud/user/playlists",
  },
  playlistInfo: "/soundcloud/playlist",
  trackInfo: {
    [searchEngines.YT]: "/info",
    [searchEngines.SC]: "soundcloud/info",
  },
};

export const searchEnginesByShortcut = {
  yt: searchEngines.YT,
  sc: searchEngines.SC,
};

export const searchEngineShortcuts = {
  [searchEngines.YT]: "yt",
  [searchEngines.SC]: "sc",
};

const searchEngineImages = {
  [searchEngines.YT]: youtube,
  [searchEngines.SC]: soundcloud,
};

export const SearchEngineIcon = ({ engine }) => {
  return (
    <span style={{ display: "inline", padding: "0 2px" }} className="icon">
      <img
        style={{
          width: "16px",
          height: "16px",
          position: "relative",
          top: "2px",
        }}
        src={searchEngineImages[engine]}
        alt="alt"
      ></img>
    </span>
  );
};

import youtube from "../icons/youtube.png";
import soundcloud from "../icons/soundcloud.png";
import React from "react";

export const menu = {
  SEARCH: "/",
  HISTORY: "/history",
  LIBRARY: "/library",
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
  playlistItems: {
    [searchEngines.YT]: "/playlist",
    [searchEngines.SC]: "/soundcloud/playlist",
  },
  trackInfo: {
    [searchEngines.YT]: "/info",
    [searchEngines.SC]: "soundcloud/info",
  },
  channelItems: {
    [searchEngines.YT]: "channel/videos",
    [searchEngines.SC]: "soundcloud/user/tracks",
  },
  channelPlaylists: {
    [searchEngines.YT]: "channel/playlists",
    [searchEngines.SC]: "soundcloud/user/playlists",
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

export const buttonTextBySearchEngine = {
  [searchEngines.YT]: {
    items: "Videos",
    playlists: "Playlists",
  },
  [searchEngines.SC]: {
    items: "Tracks",
    playlists: "Playlists",
  },
};

const searchEngineImages = {
  [searchEngines.YT]: youtube,
  [searchEngines.SC]: soundcloud,
};

export const SearchEngineIcon = ({ engine, size = "s" }) => {
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
        src={searchEngineImages[engine]}
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

import React from "react";

import youtube from "icons/youtube.svg";
import soundcloud from "icons/soundcloud.svg";

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
    [searchEngines.YT]: "/search/youtube",
    [searchEngines.SC]: "/search/soundcloud",
  },
  directUrl: {
    [searchEngines.YT]: "/url/youtube",
    [searchEngines.SC]: "/url/soundcloud",
  },
  playlistItems: {
    [searchEngines.YT]: "/playlist/youtube",
    [searchEngines.SC]: "/playlist/soundcloud",
  },
  trackInfo: {
    [searchEngines.YT]: "/info",
    [searchEngines.SC]: "soundcloud/info",
  },
  channelItems: {
    [searchEngines.YT]: "youtube/channel/items",
    [searchEngines.SC]: "soundcloud/channel/items",
  },
  channelPlaylists: {
    [searchEngines.YT]: "youtube/channel/playlists",
    [searchEngines.SC]: "soundcloud/channel/playlists",
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

export const allowedCardTypes = ["video", "playlist", "channel"];

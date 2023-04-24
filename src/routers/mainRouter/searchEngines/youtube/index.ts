import { default as youtubesr } from "youtube-sr";
import ytdl, { MoreVideoDetails } from "ytdl-core";
import ytpl from "ytpl";
import ytsr, { Video, Channel, Playlist, Item } from "ytsr";
import ytch from "./youtube-channel-info";

import { youtubeDummyData as dummyData } from "../../__test__/dummyData";

import fetch from "node-fetch";

if (process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test") {
  globalThis.fetch = fetch as unknown as typeof globalThis.fetch;
}

const COOKIE = process.env.YT_COOKIE;

type Mapper = (Item: Video | Channel | Playlist) => any;

const ping = async () => {
  await ytdl.getInfo("TrVGymR-jFU", {
    requestOptions: {
      headers: {
        cookie: COOKIE,
      },
    },
  });

  await youtubesr.getSuggestions(dummyData.suggestionQuery);

  await ytpl(dummyData.playlistId, { limit: 10 });

  await ytch.getChannelVideos(dummyData.channelId, "newest", 1);

  return true;
};

const searchMappers = {
  video: (item: Video) => ({
    ...item,
    author: { ...item.author, type: "channel" },
  }),
  channel: (item: Channel) => item,
  playlist: (item: Playlist) => ({
    ...item,
    id: item.playlistID,
    thumbnails: item.firstVideo?.thumbnails,
    playlistLength: item.length,
  }),
};

const searchMapper = (item: Item) => {
  let mappedItem = item;

  if (
    item.type === "video" ||
    item.type === "channel" ||
    item.type === "playlist"
  ) {
    const mapper = searchMappers[item.type] as Mapper;
    mappedItem = mapper(item);
  }

  return { ...mappedItem, engine: "youtube" };
};

const search = async (searchString: string) => {
  const searchResults = await ytsr(searchString, { limit: 20 });

  const mappedItems = searchResults.items.map(searchMapper);
  return mappedItems;
};

const getBasicInfoMapper = (item: MoreVideoDetails) => {
  return {
    id: item.videoId,
    url: item.video_url,
    title: item.title,
    thumbnails: item.thumbnails,
    duration: intoHHMMSS(item.lengthSeconds),
    uploadedAt: item.uploadDate,
    author: item.author,
    views: item.viewCount,
    type: "video",
    engine: "youtube",
  };
};

const getItemInfo = async (id: string) => {
  try {
    const videoInfo = await ytdl.getBasicInfo(id, {
      requestOptions: {
        headers: {
          cookie: COOKIE,
        },
      },
    });

    const returnVal = getBasicInfoMapper(videoInfo.videoDetails);

    return returnVal;
  } catch (e) {
    //idk y this is empty
    1;
  }
};

const suggestionsMapper = (suggestion: string) =>
  suggestion.replace(/\\u0027/g, "'");

const getSuggestions = async (searchString: string) => {
  const suggestions = await youtubesr.getSuggestions(searchString);
  const mappedSugesstions = suggestions.map(suggestionsMapper);
  return mappedSugesstions;
};

const getDirectUrls = async (id: string) => {
  const info = await ytdl.getInfo(id, {
    requestOptions: {
      headers: {
        cookie: COOKIE,
      },
    },
  });
  const formats = ytdl.filterFormats(info.formats, "audioonly");

  const mappedFormats = formats.reverse().map((format) => ({
    url: format.url,
    mimeType: format.mimeType,
  }));
  return mappedFormats;
};

const getPlaylistVideos = async (playlistId: string) => {
  const result = await ytpl(playlistId, { limit: 20 });
  return result.items.map((item) => ({
    ...item,
    type: "video",
    engine: "youtube",
  }));
};

interface ChannelInfo {
  type: "video";
  title: string;
  videoId: string;
  author: string;
  authorId: string;
  videoThumbnails: string;
  viewCountText: string;
  viewCount: string;
  publishedText: string;
  durationText: string;
  lengthSeconds: string;
  liveNow: string;
  premiere: string;
  premium: string;
}

const channelVideosMapper = (item: ChannelInfo) => {
  return {
    type: "video",
    engine: "youtube",
    id: item.videoId,
    title: item.title,
    thumbnails: item.videoThumbnails,
    duration: item.durationText,
    author: {
      name: item.author,
      channelId: item.authorId,
    },
    uploadedAt: item.publishedText,
    views: item.viewCount,
  };
};

const getChannelVideos = async (channelId: string) => {
  const result = await ytch.getChannelVideos(channelId, "newest", 1);
  return result.items.map(channelVideosMapper);
};

interface ChannelPlaylist {
  title: string;
  type: "playlist";
  playlistThumbnail: string;
  author: string;
  authorUrl: string;
  authorId: string;
  playlistId: string;
  playlistUrl: string;
  videoCount: string;
}

const playlistMapper = (item: ChannelPlaylist) => {
  return {
    engine: "youtube",
    type: "playlist",
    id: item.playlistId,
    title: item.title,
    thumbnails: [{ url: item?.playlistThumbnail }],
    url: item.authorUrl,
    length: item.videoCount,
    author: {
      name: item.author,
      channelId: item.authorId,
    },
  };
};

const getChannelPlaylists = async (channelId: string) => {
  const result = await ytch.getChannelPlaylistInfo(channelId, "newest", 1);
  return result.items.map(playlistMapper);
};

export default {
  getDirectUrls,
  search,
  getPlaylistItems: getPlaylistVideos,
  getChannelItems: getChannelVideos,
  getChannelPlaylists,
  getItemInfo,
  getSuggestions,
  ping,
};

const intoHHMMSS = (durationMs: string) =>
  new Date(durationMs)
    .toISOString()
    .substr(11, 8)
    .replace(/^[0:]+/, "");

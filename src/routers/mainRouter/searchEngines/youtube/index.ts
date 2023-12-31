import { default as youtubesr } from "youtube-sr";
import ytdl, { MoreVideoDetails } from "ytdl-core";
import ytpl from "ytpl";
import ytsr from "ytsr";
import ytch from "./youtube-channel-info";

import { youtubeDummyData as dummyData } from "../../__test__/dummyData";

import fetch from "node-fetch";

if (process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test") {
  globalThis.fetch = fetch as unknown as typeof globalThis.fetch;
}

type FetchedAnyItem = ytsr.Video | ytsr.Channel | ytsr.Playlist;

// const COOKIE = process.env.YT_COOKIE;

export const createPing = async (func: () => Promise<any>) => {
  try {
    await func();
    return true;
  } catch (e) {
    return false;
  }
};

const ping = async () => {
  const [
    searchForItems,
    directUrls,
    suggestions,
    playlistsContents,
    channelVideos,
    channelPlaylists,
  ] = await Promise.all([
    createPing(() => search("idkjeffery")),
    createPing(() => ytdl.getInfo("TrVGymR-jFU")),
    createPing(() => youtubesr.getSuggestions(dummyData.suggestionQuery)),
    createPing(() => ytpl(dummyData.playlistId, { limit: 10 })),
    createPing(() => ytch.getChannelVideos(dummyData.channelId, "newest", 1)),
    createPing(() => getChannelPlaylists(dummyData.channelId)),
  ]);

  return {
    searchForItems,
    suggestions,
    directUrls,
    playlistsContents,
    channelVideos,
    channelPlaylists,
  };
};

const searchMappers = {
  video: (item: ytsr.Video) => ({
    ...item,
    engine: "youtube",
    type: "item" as const,
    author: { ...item.author, type: "channel" as const },
  }),
  channel: (item: ytsr.Channel) => ({ ...item, engine: "youtube" }),
  playlist: (item: ytsr.Playlist) => ({
    ...item,
    engine: "youtube",
    id: item.playlistID,
    thumbnails: item.firstVideo?.thumbnails,
    playlistLength: item.length,
  }),
} as const;

type Mapper = (item: FetchedAnyItem) => AnyItem;

const searchMapper = (item: FetchedAnyItem): AnyItem => {
  const mapper = searchMappers[item.type] as Mapper;
  const mappedItem = mapper(item);

  return { ...mappedItem, engine: "youtube" as const };
};

const search = async (searchString: string): Promise<AnyItem[]> => {
  const searchResults = await ytsr(searchString, { limit: 20 });

  const filteredItems = searchResults.items.filter((item) =>
    ["video", "playlist", "channel"].includes(item.type)
  ) as unknown as FetchedAnyItem[];

  const mappedItems = filteredItems.map(searchMapper);

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
    type: "item",
    engine: "youtube",
  };
};

const getItemInfo = async (id: string) => {
  try {
    const videoInfo = await ytdl.getBasicInfo(id);

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
  const info = await ytdl.getInfo(id);
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
    type: "item",
    engine: "youtube",
  }));
};

type UnmappedChannelInfo = typeof itemExample;

const itemExample = {
  type: "item",
  title: "Transform",
  videoId: "81G55izMUNs",
  author: "idontknowjeffery",
  authorId: "UCtPlB4OmowajcgVaL3jvGcA",
  videoThumbnails: [
    {
      url: "https://i.ytimg.com/vi/81G55izMUNs/hqdefault.jpg?sqp=-oaymwEiCKgBEF5IWvKriqkDFQgBFQAAAAAYASUAAMhCPQCAokN4AQ==&rs=AOn4CLAyHn5sTGVIWLPobNbkEpOxsncwtQ",
      width: 168,
      height: 94,
    },
    {
      url: "https://i.ytimg.com/vi/81G55izMUNs/hqdefault.jpg?sqp=-oaymwEiCMQBEG5IWvKriqkDFQgBFQAAAAAYASUAAMhCPQCAokN4AQ==&rs=AOn4CLA5jIJ92VCQKHILzE6sg4AOc96bSw",
      width: 196,
      height: 110,
    },
    {
      url: "https://i.ytimg.com/vi/81G55izMUNs/hqdefault.jpg?sqp=-oaymwEjCPYBEIoBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLCMuxvcuV2t6BPJ7C4-4dMQEbHKmA",
      width: 246,
      height: 138,
    },
    {
      url: "https://i.ytimg.com/vi/81G55izMUNs/hqdefault.jpg?sqp=-oaymwEjCNACELwBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLDZ3BlgDZMqJfSyYgX0FEcEK1v2NQ",
      width: 336,
      height: 188,
    },
  ],
  viewCountText: "1,410 views",
  viewCount: 1410,
  publishedText: "4 days ago",
  durationText: "3:39",
  lengthSeconds: 219,
  liveNow: false,
  premiere: false,
  premium: false,
};

const channelVideosMapper = (item: UnmappedChannelInfo): Item => {
  return {
    key: item.videoId,
    url: "",
    bestThumbnail: { url: item.videoThumbnails[0].url },
    type: "item",
    engine: "youtube",
    id: item.videoId,
    title: item.title,
    thumbnails: item.videoThumbnails,
    duration: item.durationText,
    author: {
      avatars: [],
      url: "",
      name: item.author,
      channelID: item.authorId,
      bestAvatar: { url: item.videoThumbnails[0].url },
    },
    uploadedAt: item.publishedText,
    views: item.viewCount,
  };
};

type ChannelType = {
  author: string;
  authorId: string;
  authorUrl: string;
  authorBanners: string;
  authorThumbnails: { url: string }[];
  subscriberText: string;
  subscriberCount: string;
  description: string;
  isFamilyFriendly: string;
  allowedRegions: string;
  isVerified: string;
  channelIdType: string;
};

const getChannelInfo = async (channelId: string): Promise<any> => {
  try {
    const result = (await ytch.getChannelInfo(channelId, "1")) as ChannelType;

    return {
      name: result.author,
      avatar: result.authorThumbnails?.[0]?.url,
      subscribers: result.subscriberText,
    };
  } catch (e) {
    2;
  }
};

const getChannelVideos = async (channelId: string) => {
  const result = await ytch.getChannelVideos(channelId, "newest", 1);

  if (result.isTopicChannel) {
    return result.items.map(playlistMapper);
  } else {
    return result.items.map(channelVideosMapper);
  }
};

export interface ChannelPlaylist {
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
  getChannelInfo,
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

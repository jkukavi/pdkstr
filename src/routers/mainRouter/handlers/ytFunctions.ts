import { default as youtubesr } from "youtube-sr";
import ytdl from "ytdl-core";
import ytpl from "ytpl";
import ytsr from "ytsr";
import ytch from "yt-channel-info";

const COOKIE = process.env.YT_COOKIE;

const searchMapper = {
  video: (item) => ({ ...item, engine: "youtube" }),
  channel: (item) => ({ ...item, engine: "youtube" }),
  playlist: (item) => ({
    ...item,
    id: item.playlistID,
    thumbnails: item.firstVideo.thumbnails,
    playlistLength: item.length,
  }),
};

const search = async (searchString) => {
  const searchResults = await ytsr(searchString, { limit: 20 });

  const mappedItems = searchResults.items.map((item) => {
    return { ...(searchMapper[item.type]?.(item) ?? item), engine: "youtube" };
  });
  return mappedItems;
};

const getItemInfo = async (id) => {
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
    console.log(e);
  }
};

const getSuggestions = async (searchString) => {
  const suggestionsArray = await youtubesr.getSuggestions(searchString);
  const cleanedSuggestionsArray = suggestionsArray.map((suggestion) =>
    suggestion.replace(/\\u0027/g, "'")
  );
  return cleanedSuggestionsArray;
};

const getDirectUrl = async (id) => {
  let info = await ytdl.getInfo(id, {
    requestOptions: {
      headers: {
        cookie: COOKIE,
      },
    },
  });
  let format = ytdl.chooseFormat(info.formats, {
    quality: "lowest",
    filter: "audioonly",
  });
  return format.url;
};

const getPlaylistVideos = async (playlistId) => {
  const result = await ytpl(playlistId, { limit: 20 });
  return result.items.map((item) => ({
    ...item,
    type: "video",
    engine: "youtube",
  }));
};

const getChannelVideos = async (channelId) => {
  const result = await ytch.getChannelVideos(channelId, "newest", 1);
  return result.items.map(channelVideosMapper);
};

const getChannelPlaylists = async (channelId) => {
  const result = await ytch.getChannelPlaylistInfo(channelId, "newest", 1);
  return result.items.map(playlistMapper);
};

export default {
  getDirectUrl,
  search,
  getPlaylistItems: getPlaylistVideos,
  getChannelItems: getChannelVideos,
  getChannelPlaylists,
  getItemInfo,
  getSuggestions,
};

const getBasicInfoMapper = (item) => {
  return {
    id: item.videoId,
    engine: "youtube",
    url: item.video_url,
    title: item.title,
    thumbnails: item.thumbnails,
    duration: intoHHMMSS(item.lengthSeconds),
    uploadedAt: item.uploadDate,
    author: item.author,
    views: item.viewCount,
    type: "video",
  };
};

const channelVideosMapper = (item) => {
  return {
    id: item.videoId,
    engine: "youtube",
    title: item.title,
    thumbnails: item.videoThumbnails,
    duration: item.durationText,
    author: {
      name: item.author,
      channelId: item.authorId,
    },
    uploadedAt: item.publishedText,
    views: item.viewCount,
    type: "video",
  };
};

const playlistMapper = (item) => {
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
  // return {
  //   // original_url: item.permalink_url,
  //   engine: "soundcloud",
  //   url: ,
  //   title: ,
  //   thumbnails: ,
  //   duration: intoHHMMSS(item.duration),
  //   uploadedAt: ,
  //   author: {
  //     url:
  //     id: ,
  //     name: ,
  //   },
  //   length: item.tracks.length,
  //   type: "playlist",
  // };
};

const intoHHMMSS = (durationMs) =>
  new Date(durationMs)
    .toISOString()
    .substr(11, 8)
    .replace(/^[0:]+/, "");

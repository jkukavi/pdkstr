const ytdl = require("ytdl-core");
const ytsr = require("ytsr");
const ytpl = require("ytpl");
const ytch = require("yt-channel-info");
const youtubesr = require("youtube-sr").default;

const COOKIE =
  "VISITOR_INFO1_LIVE=zvW5wcHUS0M; CONSENT=YES+srp.gws-20210816-0-RC3.en+FX+789; _gcl_au=1.1.189908802.1631465358; HSID=AoWJ1_6dIVJpDIh6O; SSID=AWDIMJYvit2STDNpS; APISID=1OlAYBX78cgeQIpC/AZ1ITSJbhHAaSBiMx; SAPISID=WncHu3guCdo0Pth1/AEQL8ExSi2d6n3WOv; __Secure-1PAPISID=WncHu3guCdo0Pth1/AEQL8ExSi2d6n3WOv; __Secure-3PAPISID=WncHu3guCdo0Pth1/AEQL8ExSi2d6n3WOv; SID=CAiGuhrt5gmImYIqGXMF0lAuiegVP7FiBDpSkMVsOS3E2mz_f7iti3MPurVuzxra8if7lA.; __Secure-1PSID=CAiGuhrt5gmImYIqGXMF0lAuiegVP7FiBDpSkMVsOS3E2mz_L5bKYPV4Mkb5FhhpyOT5Ng.; __Secure-3PSID=CAiGuhrt5gmImYIqGXMF0lAuiegVP7FiBDpSkMVsOS3E2mz_Y95I132uz90tdc3lJWcgsg.; PREF=tz=Europe.Zagreb&f6=40000000&f5=30000&volume=70&library_tab_browse_id=FEmusic_liked_playlists; YSC=-0_377QHm68; LOGIN_INFO=AFmmF2swRQIgbA1kvtAGNS8MpoCLHvLzhHBvIsMmyN2wqfsofHh_SUcCIQD3tv5uxO7eXp3lwuD-MWWgBeUAZA59l5cnJ7ZqXV8dVw:QUQ3MjNmejhCakc5MHlvd0NRMF9PYzZLY3kwYXM1TnNxTzVhdE5SSV9rd2IyV211cWttN0pheGZrUUNEU3BvODVIYXIzXzE1enNPTW9zVUdPQ1B4SGNMMUxrNmtNblY1Wmx4ZkhFTXZOVXQzbi1PeUUtekhiamxhTjVGeGpNM0QwaEZoWVZ3SDgybXhDcmNaUjJjbS1jS09MMWRQYTVEcXdR; SIDCC=AJi4QfGuCcCh__-wvQRwnfKHQAyGJi3hsp6LW1e7eMnWIIA9V9U35bVm_uO1WdlZZ2id7_Gs-trd; __Secure-3PSIDCC=AJi4QfEqoqNaK-VpBIR9EZqKtxt2dvZSJdRhwFIUvg7YGPPzyA9tm1gCxW76qj01_S9jELjj-sI";

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

module.exports = {
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

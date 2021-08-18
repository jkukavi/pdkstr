const ytdl = require("ytdl-core");
const ytsr = require("ytsr");
const ytpl = require("ytpl");
const ytch = require("yt-channel-info");
const youtubesr = require("youtube-sr").default;

const COOKIE =
  "CONSENT=YES+HR.en+20150622-23-0; VISITOR_INFO1_LIVE=zvW5wcHUS0M; NID=209=LM61FasfK68rwjCAc-LZNzW5B3uGFNpFu8VxZwd9CPa_8oa6yA1T_AuJUsIySMYaL3AHo_bI-xEkJixqy_YhC9C1W_piLBzLz6kL8r2a3PcjS7ROkNPkBv3sZcf6_ovktBCZotNQtFgRXXGlIpGIF540xSNCHbOyhQU-L42IVHU; SID=_QeGusiZI0gg-YIaMtsaMsQ51hCUNsnzdWi1_Lr909C2z21TQxbTH2d6X9MIKkZbfY8vgA.; __Secure-1PSID=_QeGusiZI0gg-YIaMtsaMsQ51hCUNsnzdWi1_Lr909C2z21TtxBgeJzSTj_XztxBj3DbTQ.; __Secure-3PSID=_QeGusiZI0gg-YIaMtsaMsQ51hCUNsnzdWi1_Lr909C2z21TCWyG8Rebu-NEUFKq87WDKA.; HSID=ArAE1EiFILC6t2UGw; SSID=A7PpLg8DBIeSxDmg2; APISID=thXaCP-n4ZhQ37Ka/AOREhwh93GHNg47PU; SAPISID=R_5rwNNPyx0H9BS3/AWSeHQoulwDyqDF0K; __Secure-1PAPISID=R_5rwNNPyx0H9BS3/AWSeHQoulwDyqDF0K; __Secure-3PAPISID=R_5rwNNPyx0H9BS3/AWSeHQoulwDyqDF0K; PREF=tz=Europe.Zagreb&f6=40000000&f5=20000&f4=4000000; YSC=t42Gq8Ck7NM; LOGIN_INFO=AFmmF2swRgIhAKEMqR8YApV6OwlJJdX4yG7uDptpwVBs9iv4Y2v_IFTxAiEA3rzFmzUHSSM-CFAvjocqLKk0KHNBgDK3sUCVFWYro_U:QUQ3MjNmeElUQjNlRkJNbk05ejJIb3E1R09aRUltc1FmdS1GU1RGOGNnYXJsQjZnTGlaZmJRdUoxZklTTklYaEw2RHMzejdFMzRVUllwSVNTNW1na2llbGJZdHZtRThQa0FuMHR5Zk4wWDY0TF9rTkFBVzEtSjRCQTB4SU5MeGRjb2hNMFlqZVpwTUZTNUU3NEdWY0h0WXZQbkxSRkJTYUt3; SIDCC=AJi4QfGsySPf7hnRj65r3vX-xz9o-UwAFtJZXKJF-PTKalVMavoYM1p5uVHRNohprieX2lLfUMQ; __Secure-3PSIDCC=AJi4QfGM66pn8vtSSieLWVp7OYoP_HUoKFQxBDKEzsmqFkOcW1LtMAab9K32rXf-oCXOqxQMTMA";

const searchMapper = {
  video: (item) => ({ ...item, engine: "youtube" }),
  channel: (item) => ({ ...item, engine: "youtube" }),
  playlist: (item) => ({
    ...item,
    thumbnails: item.firstVideo.thumbnails,
    playlistLength: item.length,
  }),
};

const searchYoutube = async (searchString) => {
  const searchResults = await ytsr(searchString, { limit: 20 });

  const mappedItems = searchResults.items.map((item) => {
    return { ...(searchMapper[item.type]?.(item) ?? item), engine: "youtube" };
  });
  return mappedItems;
};

const getVideoInfo = async (id) => {
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
  const result = await ytpl(playlistId, { pages: 1 });
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
  searchYoutube,
  getPlaylistVideos,
  getChannelVideos,
  getChannelPlaylists,
  getVideoInfo,
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

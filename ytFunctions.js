const ytdl = require("ytdl-core");
const ytsr = require("ytsr");
const ytpl = require("ytpl");
const youtubesr = require("youtube-sr").default;

const COOKIE =
  "CONSENT=YES+HR.en+20150622-23-0; VISITOR_INFO1_LIVE=zvW5wcHUS0M; NID=209=LM61FasfK68rwjCAc-LZNzW5B3uGFNpFu8VxZwd9CPa_8oa6yA1T_AuJUsIySMYaL3AHo_bI-xEkJixqy_YhC9C1W_piLBzLz6kL8r2a3PcjS7ROkNPkBv3sZcf6_ovktBCZotNQtFgRXXGlIpGIF540xSNCHbOyhQU-L42IVHU; SID=_QeGusiZI0gg-YIaMtsaMsQ51hCUNsnzdWi1_Lr909C2z21TQxbTH2d6X9MIKkZbfY8vgA.; __Secure-1PSID=_QeGusiZI0gg-YIaMtsaMsQ51hCUNsnzdWi1_Lr909C2z21TtxBgeJzSTj_XztxBj3DbTQ.; __Secure-3PSID=_QeGusiZI0gg-YIaMtsaMsQ51hCUNsnzdWi1_Lr909C2z21TCWyG8Rebu-NEUFKq87WDKA.; HSID=ArAE1EiFILC6t2UGw; SSID=A7PpLg8DBIeSxDmg2; APISID=thXaCP-n4ZhQ37Ka/AOREhwh93GHNg47PU; SAPISID=R_5rwNNPyx0H9BS3/AWSeHQoulwDyqDF0K; __Secure-1PAPISID=R_5rwNNPyx0H9BS3/AWSeHQoulwDyqDF0K; __Secure-3PAPISID=R_5rwNNPyx0H9BS3/AWSeHQoulwDyqDF0K; PREF=tz=Europe.Zagreb&f6=40000000&f5=20000&f4=4000000; YSC=t42Gq8Ck7NM; LOGIN_INFO=AFmmF2swRgIhAKEMqR8YApV6OwlJJdX4yG7uDptpwVBs9iv4Y2v_IFTxAiEA3rzFmzUHSSM-CFAvjocqLKk0KHNBgDK3sUCVFWYro_U:QUQ3MjNmeElUQjNlRkJNbk05ejJIb3E1R09aRUltc1FmdS1GU1RGOGNnYXJsQjZnTGlaZmJRdUoxZklTTklYaEw2RHMzejdFMzRVUllwSVNTNW1na2llbGJZdHZtRThQa0FuMHR5Zk4wWDY0TF9rTkFBVzEtSjRCQTB4SU5MeGRjb2hNMFlqZVpwTUZTNUU3NEdWY0h0WXZQbkxSRkJTYUt3; SIDCC=AJi4QfGsySPf7hnRj65r3vX-xz9o-UwAFtJZXKJF-PTKalVMavoYM1p5uVHRNohprieX2lLfUMQ; __Secure-3PSIDCC=AJi4QfGM66pn8vtSSieLWVp7OYoP_HUoKFQxBDKEzsmqFkOcW1LtMAab9K32rXf-oCXOqxQMTMA";

const searchMapper = {
  video: (item) => item,
  channel: (item) => item,
  playlist: (item) => ({
    ...item,
    thumbnails: item.firstVideo.thumbnails,
    playlistLength: item.length,
  }),
};

const searchYoutube = async (searchString) => {
  const searchResults = await ytsr(searchString, { limit: 20 });

  const mappedItems = searchResults.items.map((item) => {
    return searchMapper[item.type]?.(item) ?? item;
  });
  return mappedItems;
};

const getVideoInfo = async (id) => {
  const videoInfo = await youtubesr.getVideo(
    `https://www.youtube.com/watch?v=${id}`
  );
  return videoInfo;
};

const getSuggestions = async (searchString) => {
  const suggestionsArray = await youtubesr.getSuggestions(searchString);
  const cleanedSuggestionsArray = suggestionsArray.map((suggestion) =>
    suggestion.replace(/\\u0027/g, "'")
  );
  return cleanedSuggestionsArray;
};

const getDirectUrl = async (url) => {
  var id = getVideoIdFromUrl(url);
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

const getVideoIdFromUrl = (text) => {
  var re =
    /https?:\/\/(?:[0-9A-Z-]+\.)?(?:youtu\.be\/|youtube(?:-nocookie)?\.com\S*?[^\w\s-])([\w-]{11})(?=[^\w-]|$)(?![?=&+%\w.-]*(?:['"][^<>]*>|<\/a>))[?=&+%\w.-]*/gi;
  return text.replace(re, "$1");
};

const getChannelVideos = async (playlistUrl) => {
  const result = await ytpl(playlistUrl, { pages: 1 });
  return result.items.map((item) => ({ ...item, type: "video" }));
};

module.exports = {
  getDirectUrl,
  searchYoutube,
  getChannelVideos,
  getVideoInfo,
  getSuggestions,
};

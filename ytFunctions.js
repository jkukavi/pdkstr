const ytdl = require("ytdl-core");
const ytsr = require("ytsr");

const searchYoutube = async (searchString) => {
  const searchResults = await ytsr(searchString, { limit: 20 });
  return searchResults.items;
};

const getDirectUrl = async (url) => {
  try {
    var id = getVideoIdFromUrl(url);
    let info = await ytdl.getInfo(id);
    let format = ytdl.chooseFormat(info.formats, {
      quality: "lowest",
      filter: "audioonly",
    });

    return format.url;
  } catch {
    return false;
  }
};

const getVideoIdFromUrl = (text) => {
  var re = /https?:\/\/(?:[0-9A-Z-]+\.)?(?:youtu\.be\/|youtube(?:-nocookie)?\.com\S*?[^\w\s-])([\w-]{11})(?=[^\w-]|$)(?![?=&+%\w.-]*(?:['"][^<>]*>|<\/a>))[?=&+%\w.-]*/gi;
  return text.replace(re, "$1");
};

module.exports = {
  getDirectUrl,
  searchYoutube,
};

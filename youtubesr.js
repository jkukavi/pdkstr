const YouTube = require("youtube-sr").default;
const fs = require("fs");

YouTube.getPlaylist(
  "https://www.youtube.com/playlist?list=UUgiz3Pm3FBhDyy3g_fP5OVA"
)
  .then(console.log) // all parsable videos
  .catch(console.error);

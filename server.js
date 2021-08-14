const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const helmet = require("helmet");
const path = require("path");
const { https } = require("follow-redirects");

const {
  getDirectUrl,
  searchYoutube,
  getChannelVideos,
  getVideoInfo,
  getSuggestions,
} = require("./ytFunctions.js");

const soundcloud = require("./scFunctions");

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "example.com"],
      imgSrc: [
        "'self'",
        "i.ytimg.com",
        "yt3.ggpht.com",
        "hips.hearstapps.com",
        "i1.sndcdn.com",
      ],
      "media-src": ["'self'", "*.googlevideo.com", "*.sndcdn.com"],
      "font-src": ["fonts.googleapis.com", "fonts.gstatic.com"],
      "style-src-elem": ["'self'", "fonts.googleapis.com", "fonts.gstatic.com"],
    },
  })
);

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// Serve the static files from the React app

app.use(express.static("client/build"));

app.post("/url", async (req, res) => {
  const { id } = req.body;
  try {
    var directUrl = await getDirectUrl(id);
    if (directUrl) {
      res.status(200).json({ directUrl });
    } else {
      res.status(400).json({ message: "Direct url not found" });
    }
  } catch (error) {
    res.status(400).json({ message: "Direct url not found" });
    console.log(JSON.stringify(error, null, 2));
  }
});

app.post("/info", async (req, res) => {
  const { id } = req.body;
  try {
    const videoInfo = await getVideoInfo(id);
    res.status(200).json(videoInfo);
  } catch (error) {
    res.status(400).json({ message: "summin fked up lol" });
    console.log(JSON.stringify(error, null, 2));
  }
});

app.post("/suggestions/:engine", async (req, res) => {
  const { engine } = req.params;
  const { searchString } = req.body;

  const getSuggestionsFunction = {
    youtube: getSuggestions,
    soundcloud: soundcloud.getSuggestions,
  }[engine];

  try {
    const suggestionsArray = await getSuggestionsFunction(searchString);
    res.status(200).json({ suggestionsArray });
  } catch (error) {
    res.status(400).json({ message: "summin fked" });
    console.log(JSON.stringify(error, null, 2));
  }
});

app.post("/search", async (req, res) => {
  const { searchString } = req.body;
  var searchResultsArray = await searchYoutube(searchString);
  if (searchResultsArray) {
    res.status(200).json({ searchResultsArray });
  } else {
    res.status(400).json({ message: "No results" });
  }
});

app.post("/playlist", async (req, res) => {
  const { playlistUrl } = req.body;
  var searchResultsArray = await getChannelVideos(playlistUrl);
  if (searchResultsArray) {
    res.status(200).json({ searchResultsArray });
  } else {
    res.status(400).json({ message: "No results" });
  }
});

app.post("/soundcloud/tracks", async (req, res) => {
  const { searchString } = req.body;
  const searchResultsArray = await soundcloud.getTracks(searchString, 10);
  res.status(200).json({ searchResultsArray });
});

app.post("/soundcloud/user/:item", async (req, res) => {
  const { item } = req.params;
  const { playlistUrl } = req.body;

  const getFunction = {
    tracks: soundcloud.getUserTracks,
    playlists: soundcloud.getUsersPlaylists,
  }[item];

  const searchResultsArray = await getFunction(playlistUrl, 20);
  res.status(200).json({ searchResultsArray });
});

app.post("/soundcloud/playlist", async (req, res) => {
  const { trackIds } = req.body;
  var playlistItems = await soundcloud.getTracksInfo(trackIds);
  if (playlistItems) {
    res.status(200).json({ playlistItems });
  } else {
    res.status(400).json({ message: "No results" });
  }
});

app.post("/soundcloud/info", async (req, res) => {
  const { id } = req.body;
  var trackInfo = await soundcloud.getTrackInfo(id);
  if (trackInfo) {
    res.status(200).json(trackInfo);
  } else {
    res.status(400).json({ message: "No results" });
  }
});

app.post("/soundcloud/url", async (req, res) => {
  const { id, fromUrl } = req.body;
  const directUrl = await soundcloud.getDirectUrl(id, fromUrl);
  res.status(200).json({ directUrl });
});

app.get("/proxy/:url", (req, res) => {
  const { url } = req.params;
  if (req.headers.range && domain(url) === "googlevideo") {
    https.get(url, { headers: { range: req.headers.range } }, (res2) => {
      res.writeHead(res2.statusCode, res2.statusMessage, res2.headers);
      res2.pipe(res);
    });
  } else {
    res.end();
  }
});

const domain = (url) => {
  const { hostname } = new URL(url);
  return hostname.split(".")[1];
};

console.log("server started 8080");
app.listen(process.env.PORT || 8080);

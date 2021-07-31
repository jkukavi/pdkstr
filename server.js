const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const helmet = require("helmet");
const path = require("path");
const { https } = require("follow-redirects");
const fs = require("fs");
const {
  getDirectUrl,
  searchYoutube,
  getPlaylistVideos,
  getVideoInfo,
  getSuggestions,
} = require("./ytFunctions.js");

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "example.com"],
      imgSrc: ["'self'", "i.ytimg.com", "yt3.ggpht.com", "hips.hearstapps.com"],
      "media-src": ["'self'", "*.googlevideo.com"],
      "font-src": ["fonts.googleapis.com", "fonts.gstatic.com"],
      "style-src-elem": ["'self'", "fonts.googleapis.com", "fonts.gstatic.com"],
    },
  })
);
//proba
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// Serve the static files from the React app

app.use(express.static("client/build"));

app.post("/url", async (req, res) => {
  const url = req.body.url;
  try {
    var directUrl = await getDirectUrl(url);
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

app.post("/suggestions", async (req, res) => {
  const { searchString } = req.body;
  try {
    const suggestionsArray = await getSuggestions(searchString);
    res.status(200).json({ suggestionsArray });
  } catch (error) {
    res.status(400).json({ message: "summin fked" });
    console.log(JSON.stringify(error, null, 2));
  }
});

app.post("/console", async (req, res) => {
  const { object } = req.body;
  console.log("incoming object");
  fs.writeFileSync("log.JSON", JSON.stringify(object, null, 2));
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
  var searchResultsArray = await getPlaylistVideos(playlistUrl);
  if (searchResultsArray) {
    res.status(200).json({ searchResultsArray });
  } else {
    res.status(400).json({ message: "No results" });
  }
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

// app.get("/proba", (req, res) => {
//   res.sendFile(path.join(__dirname, "index.html"));
// });

console.log("server started 8080");
app.listen(process.env.PORT || 8080);

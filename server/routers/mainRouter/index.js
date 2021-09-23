const express = require("express");

const {
  getDirectUrl,
  searchYoutube,
  getPlaylistVideos,
  getChannelVideos,
  getChannelPlaylists,
  getVideoInfo,
  getSuggestions,
} = require("./handlers/ytFunctions.js");

const soundcloud = require("./handlers/scFunctions");

const app = express.Router();

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
  const { id } = req.body;
  var playlistItems = await getPlaylistVideos(id);
  if (playlistItems) {
    res.status(200).json({ playlistItems });
  } else {
    res.status(400).json({ message: "No results" });
  }
});

app.post("/channel/videos", async (req, res) => {
  const { channelId } = req.body;
  const searchResultsArray = await getChannelVideos(channelId);
  if (searchResultsArray) {
    res.status(200).json({ searchResultsArray });
  } else {
    res.status(400).json({ message: "No results" });
  }
});

app.post("/channel/playlists", async (req, res) => {
  const { channelId } = req.body;
  const searchResultsArray = await getChannelPlaylists(channelId);
  if (searchResultsArray) {
    res.status(200).json({ searchResultsArray });
  } else {
    res.status(400).json({ message: "No results" });
  }
});

app.post("/soundcloud/tracks", async (req, res) => {
  const { searchString } = req.body;
  const searchResultsArray = await soundcloud.searchForTracks(searchString, 10);
  res.status(200).json({ searchResultsArray });
});

app.post("/soundcloud/user/:item", async (req, res) => {
  const { item } = req.params;
  const { channelId } = req.body;

  const getFunction = {
    tracks: soundcloud.getUserTracks,
    playlists: soundcloud.getUsersPlaylists,
  }[item];

  const searchResultsArray = await getFunction(channelId, 20);
  res.status(200).json({ searchResultsArray });
});

app.post("/soundcloud/playlist", async (req, res) => {
  const { id } = req.body;
  var playlistItems = await soundcloud.getPlaylistItems(id);
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

module.exports = app;

const express = require("express");

const youtubeHandlers = require("./handlers/ytFunctions.js");
const soundcloudHandlers = require("./handlers/scFunctions");
const engines = {
  youtube: youtubeHandlers,
  soundcloud: soundcloudHandlers,
};

const app = express.Router();

app.post("/url/:engine", async (req, res) => {
  const { engine } = req.params;

  if (!(engine in engines)) {
    throw new Error("Bad request.");
  }

  const { id, fromUrl } = req.body;
  const getDirectUrl = engines[engine].getDirectUrl;

  try {
    var directUrl = await getDirectUrl(id, fromUrl);
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

//unused for now...
app.post("/info/:engine", async (req, res) => {
  const { engine } = req.params;
  const { id } = req.body;

  if (!(engine in engines)) {
    throw new Error("Bad request");
  }

  const getItemInfo = engines[engine];

  try {
    const itemInfo = await getItemInfo(id);
    res.status(200).json(itemInfo);
  } catch (error) {
    res.status(400).json({ message: "Somethin went wrong" });
  }
});

app.post("/suggestions/:engine", async (req, res) => {
  const { engine } = req.params;
  const { searchString } = req.body;

  const { getSuggestions } = engines[engine];

  try {
    const suggestionsArray = await getSuggestions(searchString);
    res.status(200).json({ suggestionsArray });
  } catch (error) {
    res.status(400).json({ message: "summin fked" });
    console.log(JSON.stringify(error, null, 2));
  }
});

app.post("/search/:engine", async (req, res) => {
  const { engine } = req.params;
  const { searchString } = req.body;

  if (!(engine in engines)) {
    throw new Error("Bad request");
  }

  const { search } = engines[engine];

  let searchResultsArray = await search(searchString);
  if (searchResultsArray) {
    res.status(200).json({ searchResultsArray });
  } else {
    res.status(400).json({ message: "No results" });
  }
});

app.post("/playlist/:engine", async (req, res) => {
  const { engine } = req.params;
  const { id } = req.body;

  if (!(engine in engines)) {
    throw new Error("Bad request");
  }

  const { getPlaylistItems } = engines[engine];

  var playlistItems = await getPlaylistItems(id);
  if (playlistItems) {
    res.status(200).json({ playlistItems });
  } else {
    res.status(400).json({ message: "No results" });
  }
});

app.post("/:engine/channel/:itemType", async (req, res) => {
  const { engine, itemType } = req.params;
  const { channelId } = req.body;

  const getChannel = {
    items: "getChannelItems",
    playlists: "getChannelPlaylists",
  };

  const getChannelData = engines[engine][getChannel[itemType]];

  const searchResultsArray = await getChannelData(channelId);
  if (searchResultsArray) {
    res.status(200).json({ searchResultsArray });
  } else {
    res.status(400).json({ message: "No results" });
  }
});

module.exports = app;

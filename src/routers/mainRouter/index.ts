import express from "express";
import engines from "./searchEngines";

const app = express.Router();

app.post<string, { engine: Engine }>("/url/:engine", async (req, res) => {
  const { engine } = req.params;
  if (!(engine in engines)) {
    throw new Error("Bad request.");
  }

  const { id, fromUrl } = req.body;
  const { getDirectUrls } = engines[engine];

  try {
    const directUrl = await getDirectUrls(id, fromUrl);
    if (directUrl) {
      res.status(200).json({ directUrl });
    } else {
      res.status(400).json({ message: "Direct url not found" });
    }
  } catch (error) {
    res.status(400).json({ message: "Direct url not found" });
  }
});

app.post<string, { engine: Engine }>("/info/:engine", async (req, res) => {
  const { engine } = req.params;
  const { id } = req.body;

  if (!(engine in engines)) {
    throw new Error("Bad request");
  }

  const { getItemInfo } = engines[engine];

  try {
    const itemInfo = await getItemInfo(id);
    res.status(200).json(itemInfo);
  } catch (error) {
    res.status(400).json({ message: "Somethin went wrong" });
  }
});

app.post<string, { engine: Engine }, any, { searchString: string }>(
  "/suggestions/:engine",
  async (req, res) => {
    const { engine } = req.params;
    const { searchString } = req.body;
    const { getSuggestions } = engines[engine];

    try {
      const suggestionsArray = await getSuggestions(searchString);
      res.status(200).json({ suggestionsArray });
    } catch (error) {
      res.status(400).json({ message: "summin fked" });
    }
  }
);

app.post<string, { engine: Engine }, any, { searchString: string }>(
  "/search/:engine",
  async (req, res) => {
    const { engine } = req.params;
    const { searchString } = req.body;

    if (!(engine in engines)) {
      throw new Error("Bad request");
    }

    const { search } = engines[engine];

    try {
      if (!searchString) {
        throw new Error();
      }
      const searchResultsArray = await search(searchString);
      res.status(200).json({ searchResultsArray });
    } catch (e) {
      res.status(400).send();
    }
  }
);

app.post<string, { engine: Engine }, any, { id: string }>(
  "/playlist/:engine",
  async (req, res) => {
    const { engine } = req.params;
    const { id } = req.body;

    if (!(engine in engines)) {
      throw new Error("Bad request");
    }

    const { getPlaylistItems } = engines[engine];

    const playlistItems = await getPlaylistItems(id);
    if (playlistItems) {
      res.status(200).json({ playlistItems });
    } else {
      res.status(400).json({ message: "No results" });
    }
  }
);

app.post<string, { engine: Engine }, any, { id: string }>(
  "/channel/:engine/info",
  async (req, res) => {
    const { engine } = req.params;
    const { id } = req.body;

    if (!(engine in engines)) {
      throw new Error("Bad request");
    }

    const { getChannelInfo } = engines[engine];

    try {
      const channelInfo = await getChannelInfo(id);
      res.status(200).json(channelInfo);
    } catch (e) {
      res.status(400).json({ message: "Error fetching channel info" });
    }
  }
);

app.post<
  string,
  {
    engine: "soundcloud" | "youtube";
    itemType: "items" | "playlists";
  },
  any,
  { channelId: string }
>("/:engine/channel/:itemType", async (req, res) => {
  const { engine, itemType } = req.params;
  const { channelId } = req.body;

  const selectedEngine = engines[engine];

  const getChannels = {
    items: selectedEngine.getChannelItems,
    playlists: selectedEngine.getChannelPlaylists,
  };

  const searchResultsArray = await getChannels[itemType](channelId);
  if (searchResultsArray) {
    res.status(200).json({ searchResultsArray });
  } else {
    res.status(400).json({ message: "No results" });
  }
});

app.get<string, { engine: Engine }>("/ping/:engine", async (req, res) => {
  const { engine } = req.params;

  try {
    await engines[engine].ping();
    res.status(200).send();
  } catch (e) {
    res.status(400).send();
  }
});

export default app;

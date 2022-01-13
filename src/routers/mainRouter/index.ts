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
    var directUrl = await getDirectUrls(id, fromUrl);
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
// app.post("/info/:engine", async (req: Request, res: Response) => {
//   const { engine } = req.params;
//   const { id } = req.body;

//   if (!(engine in engines)) {
//     throw new Error("Bad request");
//   }

//   const getItemInfo = engines[engine];

//   try {
//     const itemInfo = await getItemInfo(id);
//     res.status(200).json(itemInfo);
//   } catch (error) {
//     res.status(400).json({ message: "Somethin went wrong" });
//   }
// });

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
      console.log(JSON.stringify(error, null, 2));
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
      let searchResultsArray = await search(searchString);
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

    var playlistItems = await getPlaylistItems(id);
    if (playlistItems) {
      res.status(200).json({ playlistItems });
    } else {
      res.status(400).json({ message: "No results" });
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

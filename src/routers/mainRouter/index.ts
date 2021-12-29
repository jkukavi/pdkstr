import express, { Request, Response } from "express";
import youtubeHandlers from "./handlers/ytFunctions";
import soundcloudHandlers from "./handlers/scFunctions";

interface Engine {
  getDirectUrl: any;
  search: any;
  getPlaylistItems: any;
  getChannelItems: any;
  getChannelPlaylists: any;
  getItemInfo: any;
  getSuggestions: any;
}
interface Engines {
  [engineName: string]: Engine;
}

const engines: Engines = {
  youtube: youtubeHandlers,
  soundcloud: soundcloudHandlers,
};

const app = express.Router();

app.post(
  "/url/:engine",
  async (req: Request<{ engine: "youtube" | "soundcloud" }>, res: Response) => {
    const { engine } = req.params;

    if (!(engine in engines)) {
      throw new Error("Bad request.");
    }

    const { id, fromUrl } = req.body;
    const { getDirectUrl } = engines[engine];

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
  }
);

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

app.post("/suggestions/:engine", async (req: Request, res: Response) => {
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

app.post("/search/:engine", async (req: Request, res: Response) => {
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
});

app.post("/playlist/:engine", async (req: Request, res: Response) => {
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

type functionType = "getChannelItems" | "getChannelPlaylists";

app.post(
  "/:engine/channel/:itemType",
  async (
    req: Request<{
      engine: "soundcloud" | "youtube";
      itemType: "items" | "playlists";
    }>,
    res: Response
  ) => {
    const { engine, itemType } = req.params;
    const { channelId } = req.body;

    const getChannel: {
      [prop: string]: functionType;
    } = {
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
  }
);

export default app;

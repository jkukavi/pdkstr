import express from "express";
import engines from "./searchEngines";
import { getRecommendations } from "./recommendations";
import users from "models/user";
import axios from "axios";

const engineShorthands: {
  [key in Engine]: string;
} = {
  youtube: "yt",
  soundcloud: "sc",
};

const app = express.Router();

const cacheItem = async ({ engine, id }: { engine: Engine; id: string }) => {
  if (!process.env.STORAGE_SERVICE_URL) {
    return null;
  }
  try {
    const url = `${process.env.PODKASTER_URL}/proxy/dl/cached/${id}`;

    console.log(url);

    const getDirectUrls = {
      soundcloud: async (id: string) => {
        const directUrls = await engines.soundcloud.getDirectUrls(id);

        return directUrls[0].url;
      },
      youtube: async () => `${process.env.PODKASTER_URL}/proxy/dl/cached/${id}`,
    }[engine];

    const directUrl = await getDirectUrls(id);

    axios.post(`${process.env.STORAGE_SERVICE_URL}/api/mp3`, {
      sourceKey: `${engineShorthands[engine]}.${id}`,
      url: directUrl,
    });
  } catch (e) {
    console.log("unable to start caching on storage-service");
  }
};

const getCachedUrl = async (sourceId: string) => {
  let response = null;

  if (!process.env.STORAGE_SERVICE_URL) {
    return null;
  }

  try {
    const rawResponse = await axios.get(
      `${process.env.STORAGE_SERVICE_URL}/api/presigned/${sourceId}`,
      { timeout: 2000 }
    );

    response = rawResponse.data;
  } catch (e) {
    response = null;
  }

  return response;
};

app.post<string, { engine: Engine }>("/url/:engine", async (req, res) => {
  const { engine } = req.params;
  if (!(engine in engines)) {
    throw new Error("Bad request.");
  }

  const { id, fromUrl } = req.body;
  const { getDirectUrls } = engines[engine];

  const cachedUrl = await getCachedUrl(`${engineShorthands[engine]}.${id}`);

  if (cachedUrl) {
    return res.status(200).json({
      directUrl: [
        {
          url: cachedUrl,
          mimeType: 'audio/webm; codecs="opus"',
        },
      ],
    });
  } else {
    cacheItem({
      engine,
      id,
    });
  }

  try {
    const directUrl = await getDirectUrls(id, fromUrl);
    if (directUrl) {
      res.status(200).json({ directUrl });
    } else {
      console.log(directUrl);
      res.status(400).json({ message: "Direct url not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Direct url not found" });
  } finally {
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

app.get<string, { engine: Engine }, any, { searchString: string }>(
  "/recommendations",
  async (req, res) => {
    const id = res.locals.userId;
    const history = await users.getMyRecentHistory(id, "item", "", 0);

    try {
      const recommendations = await getRecommendations(history);
      let results = [];

      for (const item of recommendations) {
        const searchResults = await engines.youtube.search(item);
        const firstFoundSearchResult = searchResults[0];
        if (firstFoundSearchResult) {
          results.push(firstFoundSearchResult);
        }
      }

      res.status(200).json({ recommendations: results });
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

    try {
      const playlistItems = await getPlaylistItems(id);
      if (playlistItems) {
        res.status(200).json({ playlistItems });
      } else {
        res.status(400).json({ message: "No results" });
      }
    } catch (e) {
      res.status(400).json({ message: "Error fetching playlist items" });
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

app.get<string, { engine: Engine }>("/health/:engine", async (req, res) => {
  const { engine } = req.params;

  try {
    const result = await engines[engine].ping();
    res.status(200).json(result);
  } catch (e) {
    res.status(200).send(false);
  }
});

export default app;

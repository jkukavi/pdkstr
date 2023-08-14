import { paths } from "consts";
import { instance as axios } from "contexts/axiosInstance";
import { notify } from "components/Notifications";
import { addRandomKey } from "helpers";

export const tryRestartingService = async () => {
  try {
    await axios.post("/service/restart");
    notify("Successfuly restarted.");
  } catch (e) {
    notify(
      "Unable to restart service. Could be that you have unsufficient permissions."
    );
  }
};

export const addToHistory = async (item: AnyItem) => {
  try {
    await axios.post("/users/my/history", { item });
  } catch (e) {
    notify("Unable to record this listening to history.");
  }
};

export const addToFavourites = async (item: AnyItem) => {
  try {
    await axios.post("/users/my/favourites", { item });
    notify("Added to favourites");
  } catch (e) {
    notify("Unable to add to favourites");
  }
};

const buildQueryString = (params: Record<string, string>) => {
  const parsedParams = new URLSearchParams(params);

  if (parsedParams) {
    return `?${parsedParams}`;
  } else return "";
};

export const getMyHistory = async (
  type: ItemType,
  search: string,
  page = 0,
  pageSize = 10
) => {
  const queryString = buildQueryString({
    search,
    page: page.toString(),
    pageSize: pageSize.toString(),
  });

  const path = "/users/my/history/" + type + queryString;

  try {
    const response = await axios.get(path);
    const fetchedHistory = response.data.map(addRandomKey);
    return fetchedHistory as AnyItem[];
  } catch (e) {
    notify("Unable to load history.");
    return [];
  }
};

export const getMyFavourites = async (
  type: ItemType,
  search: string,
  page = 0,
  pageSize = 10
) => {
  const queryString = buildQueryString({
    search,
    page: page.toString(),
    pageSize: pageSize.toString(),
  });

  const path = "/users/my/favourites/" + type + queryString;

  try {
    const response = await axios.get(path);
    const fetchedFavourites = response.data.map(addRandomKey);
    return fetchedFavourites as AnyItem[];
  } catch (e) {
    notify("Unable to load favourites.");
    return [];
  }
};

export const getPlaylistItems = async (
  id: string,
  engine: Engine
): Promise<Item[]> => {
  const path = paths.playlistItems[engine];

  let fetchedPlaylistItems: Item[] = [];

  try {
    const response = await axios.post(path, {
      id,
    });
    const { playlistItems } = response.data;
    fetchedPlaylistItems = playlistItems || [];
    return fetchedPlaylistItems;
  } catch (e) {
    notify("Something went wrong. Try again.");
    return fetchedPlaylistItems;
  }
};

export const fetchItemInfo = async (
  id: string,
  engine: Engine
): Promise<Item> => {
  try {
    const path = paths.trackInfo[engine];

    const response = await axios.post(path, {
      id,
    });

    return response.data as Item;
  } catch (e) {
    notify("Unable to fetch track info");
  }

  return {} as Item;
};

export const fetchDirectUrl = async ({
  id,
  engine,
  url,
}: {
  id: string;
  engine: Engine;
  url: string;
}) => {
  const path = paths.directUrl[engine];
  const response = await axios.post(path, {
    id,
    ...(engine === "soundcloud" && { fromUrl: url }),
  });
  const { directUrl } = response.data;
  return directUrl;
};

export const fetchItems = async (
  searchString: string,
  searchEngine: Engine
) => {
  const url = paths.search[searchEngine];
  const response = await axios.post(url, {
    searchString,
  });
  const searchResultsArray = response.data.searchResultsArray.map(addRandomKey);
  return searchResultsArray;
};

export const getChannelInfo = async (channelId: string, engine: Engine) => {
  const path = paths.channelInfo[engine];

  const response = await axios.post(path, {
    id: channelId,
  });

  const channelInfo = response.data;

  return channelInfo;
};

export const getChannelPlaylists = async (
  channelId: string,
  engine: Engine
) => {
  const path = paths.channelPlaylists[engine];

  const response = await axios.post(path, {
    channelId,
  });

  const searchResultsArray = response.data.searchResultsArray.map(addRandomKey);

  return searchResultsArray;
};

const channelInfoFromItem = (item: any) => {
  return {
    youtube: (type: AnyItem["type"]) =>
      ({
        channel: item,
        playlist: item,
        video: item.author,
      }[type]),
    soundcloud: (type: AnyItem["type"]) =>
      ({ playlist: item, video: item.author, channel: item }[type]),
  }[item.engine as Engine](item.type);
};

export const getChannelItems = async (channelId: string, engine: Engine) => {
  const path = paths.channelItems[engine];

  const response = await axios.post(path, {
    channelId,
  });
  const searchResultsArray = response.data.searchResultsArray.map(addRandomKey);

  return searchResultsArray;
};

export const getChannelItemsFromId = async (
  channelId: string,
  engine: Engine
) => {
  const path = paths.channelItems[engine];

  const response = await axios.post(path, {
    channelId,
  });
  const searchResultsArray = response.data.searchResultsArray.map(addRandomKey);
  const channelInfo = channelInfoFromItem(searchResultsArray[0]);

  return {
    channelInfo: { ...channelInfo, engine },
    searchResultsArray,
  };
};

export const ping = async (engine: Engine): Promise<void> => {
  const path = paths.ping[engine];

  await axios.get(path);
};

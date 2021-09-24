import { paths } from "../consts";
import { instance as axios } from "../contexts/axiosInstance";
import { notify } from "../components/Notifications";
import { searchEngines } from "../consts";
import { addRandomKey } from "../helpers/helpers";

export const getPlaylistItems = async (playlist) => {
  const path = paths.playlistItems[playlist.engine];

  const id = playlist.id;

  try {
    const response = await axios.post(path, {
      id,
    });
    const { playlistItems } = response.data;
    return playlistItems;
  } catch (e) {
    notify("Something went wrong. Try again.");
  }
};

export const getChannelPlaylists = async (item) => {
  const path = paths.channelPlaylists[item.engine];

  const channelId = {
    [searchEngines.YT]: (type) =>
      ({
        channel: item.channelID,
        [undefined]: item.channelID,
        video: item.author?.channelID,
      }[type]),
    [searchEngines.SC]: (type) =>
      ({ [undefined]: item.id, video: item.author?.id }[type]),
  }[item.engine](item.type);

  const channelInfo = {
    [searchEngines.YT]: (type) =>
      ({
        channel: item,
        [undefined]: item,
        video: item.author,
      }[type]),
    [searchEngines.SC]: (type) =>
      ({ [undefined]: item, video: item.author }[type]),
  }[item.engine](item.type);

  const response = await axios.post(path, {
    channelId,
  });

  const searchResultsArray = response.data.searchResultsArray.map(addRandomKey);

  return {
    channelInfo: { ...channelInfo, engine: item.engine },
    searchResultsArray,
  };
};

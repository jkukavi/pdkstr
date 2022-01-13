import scScrappy, {
  Suggestion,
  UsersTrack,
  UsersPlaylist,
  Track,
} from "@mikivela/sc-scrappy";

export const suggestionMapper = (suggestion: Suggestion) => {
  const suggestionString = suggestion.output;
  return suggestionString;
};

const getUrlFromTrack = (item: Track | UsersTrack): string | undefined => {
  const url = item.media.transcodings.find(
    (item) => item.format.protocol === "progressive"
  )?.url;

  return url;
};

export const trackMapper = (item: Track | UsersTrack) => {
  return {
    // original_url: item.permalink_url,
    id: item.id,
    engine: "soundcloud",
    url: getUrlFromTrack(item),
    title: item.title,
    thumbnails: [
      {
        url:
          item.artwork_url?.replace("large", "t200x200") ??
          item.user.avatar_url,
      },
    ],
    duration: intoHHMMSS(item.duration),
    uploadedAt: item.created_at.substring(0, 10),
    author: {
      engine: "soundcloud",
      type: "channel",
      url: item.user.permalink_url,
      id: item.user.id,
      name: item.user.username,
      avatars: [{ url: item.user.avatar_url }],
    },
    views: item.playback_count,
    type: "video",
  };
};

export const playlistMapper = (item: UsersPlaylist) => {
  return {
    // original_url: item.permalink_url,
    engine: "soundcloud",
    url: item.permalink_url,
    title: item.title,
    thumbnails: [
      {
        url:
          item.artwork_url?.replace("large", "t200x200") ??
          item.user.avatar_url,
      },
    ],
    duration: intoHHMMSS(item.duration),
    uploadedAt: item.created_at.substring(0, 10),
    author: {
      engine: "soundcloud",
      type: "channel",
      url: item.user.permalink_url,
      id: item.user.id,
      name: item.user.username,
      avatars: [{ url: item.user.avatar_url }],
    },
    id: item.id,
    length: item.tracks.length,
    type: "playlist",
  };
};

const intoHHMMSS = (durationMs: any) =>
  new Date(durationMs)
    .toISOString()
    .substr(11, 8)
    .replace(/^[0:]+/, "");

const mapAfterFetch = <S extends any[], T, Z>(
  fetch: (...args: S) => Promise<T[]>,
  mapper: (item: T) => Z
): ((...args: S) => Promise<Z[]>) => {
  return async (...args) => {
    const response = await fetch(...args);
    return response.map(mapper);
  };
};

const mappAfterSingleItemFetch = <S extends any[], T, Z>(
  fetch: (...args: S) => Promise<T>,
  mapper: (item: T) => Z
): ((...args: S) => Promise<Z>) => {
  return async (...args) => {
    const response = await fetch(...args);
    return mapper(response);
  };
};

const {
  ping,
  search,
  getTrackInfo,
  getPlaylistItems,
  getChannelItems,
  getChannelPlaylists,
  getSuggestions,
  getDirectUrls,
} = scScrappy;

export default {
  ping,
  search: mapAfterFetch(search, trackMapper),
  getItemInfo: mappAfterSingleItemFetch(getTrackInfo, trackMapper),
  getPlaylistItems: mapAfterFetch(getPlaylistItems, trackMapper),
  getChannelItems: mapAfterFetch(getChannelItems, trackMapper),
  getChannelPlaylists: mapAfterFetch(getChannelPlaylists, playlistMapper),
  getSuggestions: mapAfterFetch(getSuggestions, suggestionMapper),
  getDirectUrls,
};

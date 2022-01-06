import { https } from "follow-redirects";

let clientId = process.env.SOUNDCLOUD_API_KEY;

const httpsClient = {
  get: async (url: string): Promise<string> => {
    const promisifiedHttps = new Promise<string>((resolve, reject) => {
      https.get(url, (response) => {
        let data = "";

        response.on("data", (chunk) => {
          data += chunk;
        });

        response.on("end", () => {
          resolve(data);
        });

        response.on("error", (error) => {
          reject(error);
        });
      });
    });

    return promisifiedHttps;
  },
};

async function getUserTracks(userId: string, limit: any = 10) {
  let userTracksURL = `https://api-v2.soundcloud.com/users/${userId}/tracks?client_id=${clientId}&limit=${limit}`;
  const rawResponse = await httpsClient.get(userTracksURL);
  const userTracks = JSON.parse(rawResponse).collection.map(trackMapper);
  return userTracks;
}

async function getUsersPlaylists(userId: string, limit: any = 20) {
  //playlists_without_albums
  //playlists
  const url = `https://api-v2.soundcloud.com/users/${userId}/playlists_without_albums?client_id=${clientId}&limit=${limit}`;
  const rawData = await httpsClient.get(url);
  const unmappedPlaylists = JSON.parse(rawData).collection;
  const mappedPlaylists = unmappedPlaylists.map(playlistMapper);
  return mappedPlaylists;
}

const suggestionMapper = (rawSuggestion: { output: string }) => {
  const suggestion = rawSuggestion.output;
  return suggestion;
};

async function getSuggestions(searchString: string, limit: any = 10) {
  let url = `https://api-v2.soundcloud.com/search/queries?q=${searchString}&client_id=${clientId}&limit=${limit}`;
  const rawData = await httpsClient.get(url);
  const suggestions = JSON.parse(rawData).collection.map(suggestionMapper);
  return suggestions;
}

async function getItemInfo(trackId: string) {
  // ili return (await getTracksInfo([id]))[0];
  let url = `https://api-v2.soundcloud.com/tracks/${trackId}?client_id=${clientId}`;
  const rawData = await httpsClient.get(url);
  const unmappedTrackInfo = JSON.parse(rawData);
  const trackInfo = trackMapper(unmappedTrackInfo);
  return trackInfo;
}

async function getTracksInfo(trackIdsArray: string[]) {
  const uriEncodedCommaSeparatedTrackIds = encodeURIComponent(
    trackIdsArray.join(",")
  );
  let url = `https://api-v2.soundcloud.com/tracks?ids=${uriEncodedCommaSeparatedTrackIds}&client_id=${clientId}`;
  const rawData = await httpsClient.get(url);
  const tracksInfos = JSON.parse(rawData).map(trackMapper);
  return tracksInfos;
}

async function getPlaylistItems(id: string) {
  const trackIdsArray = await getPlaylistTrackIds(id);
  const playlistItems = await getTracksInfo(trackIdsArray);
  return playlistItems;
}

async function getPlaylistTrackIds(playlistId: string): Promise<string[]> {
  let url = `https://api-v2.soundcloud.com/playlists/${playlistId}?client_id=${clientId}`;
  const rawData = await httpsClient.get(url);
  const playlistInfo = JSON.parse(rawData);
  const trackIdsArray = playlistInfo.tracks.map((item: any) => item.id);
  return trackIdsArray;
}

async function search(searchString: string, limit: any = 10) {
  const encodedSearchString = encodeURIComponent(searchString);
  var url = `https://api-v2.soundcloud.com/search/tracks?q=${encodedSearchString}&client_id=${clientId}&limit=${limit}`;
  const rawData = await httpsClient.get(url);
  const body = JSON.parse(rawData);
  const unmappedTracks = body.collection;
  const mappedTracks = unmappedTracks.map(trackMapper);
  return mappedTracks;
}

const getDirectUrls = async (trackId: string, fromUrl: any) => {
  const urlWithoutCredentials =
    fromUrl || ((await getItemInfo(trackId)) as any).url;

  const url = `${urlWithoutCredentials}?client_id=${clientId}`;
  const rawData = await httpsClient.get(url);
  const body = JSON.parse(rawData);
  const directUrl = body.url;
  const directUrls = [{ url: directUrl, mimeType: "audio/mpeg" }];
  return directUrls;
};

const ping = async () => {
  try {
    const response = await search("idkjeffery", 2);
    return true;
  } catch (e) {
    throw new Error(e as any);
  }
};

export default {
  ping,
  search,
  getItemInfo,
  getPlaylistItems,
  getChannelItems: getUserTracks,
  getChannelPlaylists: getUsersPlaylists,
  getSuggestions,
  getDirectUrls,
};

const trackMapper = (item: any) => {
  const progressiveTranscoding = item.media.transcodings.find(
    (item: any) => item.format.protocol === "progressive"
  );

  return {
    // original_url: item.permalink_url,
    id: item.id,
    engine: "soundcloud",
    url: progressiveTranscoding.url,
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

const playlistMapper = (item: any) => {
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

// search("idontknowjeffery").then((res) => {
//   require("fs").writeFileSync("getTracks.JSON", JSON.stringify(res, null, 2));
// });

// getUserTracks(55254934).then((res) => {
//   var bla = 2;
// });

// getUsersPlaylists(55254934).then((res) => {
//   require("fs").writeFileSync(
//     "getUsersPlaylists.JSON",
//     JSON.stringify(res, null, 2)
//   );
// });

// getItemInfo(983132659).then((res) => {
//   var bla = 2;
// });

// getPlaylistInfo(1211028727).then((res) => {
//   require("fs").writeFileSync(
//     "playlistINFo.json",
//     JSON.stringify(res, null, 2)
//   );
// });

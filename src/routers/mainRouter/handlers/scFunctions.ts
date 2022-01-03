import { https } from "follow-redirects";
import request from "request";

let clientId = process.env.SOUNDCLOUD_API_KEY;

function getUserTracks(userId: string, limit: any = 10) {
  return new Promise((resolve, rej) => {
    let userTracksURL =
      "https://api-v2.soundcloud.com/users/USER_ID_TERM/tracks?client_id=CLIENT_ID_TERM&limit=LIMIT_TERM";

    userTracksURL = userTracksURL
      .replace("USER_ID_TERM", userId as string)
      .replace("CLIENT_ID_TERM", clientId as string)
      .replace("LIMIT_TERM", limit as string);

    https.get(userTracksURL, (res) => {
      let data = "";

      res.on("data", (chunk) => {
        data += chunk;
      });

      res.on("end", () => {
        resolve(JSON.parse(data).collection.map(trackMapper));
      });
    });
  });
}

function getUsersPlaylists(userId: string, limit: any = 20) {
  return new Promise((resolve, rej) => {
    //playlists_without_albums
    //playlists
    let userPlaylistsURL =
      "https://api-v2.soundcloud.com/users/USER_ID_TERM/playlists_without_albums?client_id=CLIENT_ID_TERM&limit=LIMIT_TERM";

    userPlaylistsURL = userPlaylistsURL
      .replace("USER_ID_TERM", userId)
      .replace("CLIENT_ID_TERM", clientId as string)
      .replace("LIMIT_TERM", limit as string);

    https.get(userPlaylistsURL, (res) => {
      let data = "";

      res.on("data", (chunk) => {
        data += chunk;
      });

      res.on("end", () => {
        let resultData = JSON.parse(data).collection;
        resolve(resultData.map(playlistMapper));
      });
    });
  });
}

function getSuggestions(searchString: string, limit: any = 10) {
  return new Promise((resolve, rej) => {
    //playlists_without_albums
    //playlists
    let suggestionsURL =
      "https://api-v2.soundcloud.com/search/queries?q=SEARCH_TERM&client_id=CLIENT_ID_TERM&limit=LIMIT_TERM";

    suggestionsURL = suggestionsURL
      .replace("SEARCH_TERM", encodeURIComponent(searchString))
      .replace("CLIENT_ID_TERM", clientId as string)
      .replace("LIMIT_TERM", limit);

    https.get(suggestionsURL, (res) => {
      let data = "";

      res.on("data", (chunk) => {
        data += chunk;
      });

      res.on("end", () => {
        try {
          const response = JSON.parse(data).collection.map(
            (suggestion: { output: string }) => suggestion.output
          );
          resolve(response);
        } catch (e) {
          rej(e);
        }
      });
    });
  });
}

async function getItemInfo(id: string) {
  // ili return (await getTracksInfo([id]))[0];
  return new Promise((resolve, rej) => {
    let tracksUrl =
      "https://api-v2.soundcloud.com/tracks/TRACK_ID_TERM?client_id=CLIENT_ID_TERM";

    tracksUrl = tracksUrl
      .replace("TRACK_ID_TERM", id)
      .replace("CLIENT_ID_TERM", clientId as string);

    request.get(tracksUrl, {}, (err, res, body) => {
      const rawTrackInfo = JSON.parse(body);
      const trackInfo = trackMapper(rawTrackInfo);

      resolve(trackInfo);
    });
  });
}

function getTracksInfo(ids: string[]) {
  return new Promise((resolve, rej) => {
    let tracksUrl =
      "https://api-v2.soundcloud.com/tracks?ids=IDS_TERM&client_id=CLIENT_ID_TERM";

    const idsString = encodeURIComponent(ids.join(","));

    tracksUrl = tracksUrl
      .replace("IDS_TERM", idsString)
      .replace("CLIENT_ID_TERM", clientId as string);

    https.get(tracksUrl, (res) => {
      let data = "";

      res.on("data", (chunk) => {
        data += chunk;
      });

      res.on("end", () => {
        resolve(JSON.parse(data).map(trackMapper));
      });
    });
  });
}

async function getPlaylistItems(id: string) {
  const trackIdsArray = await getPlaylistTrackIds(id);
  const playlistItems = await getTracksInfo(trackIdsArray);
  return playlistItems;
}

async function getPlaylistTrackIds(id: string): Promise<string[]> {
  return new Promise(async (resolve, rej) => {
    let playlistUrl =
      "https://api-v2.soundcloud.com/playlists/PLAYLIST_ID_TERM?client_id=CLIENT_ID_TERM";

    playlistUrl = playlistUrl
      .replace("PLAYLIST_ID_TERM", id)
      .replace("CLIENT_ID_TERM", clientId as string);

    try {
      request.get(playlistUrl, {}, (err, res, body) => {
        const playlistInfo = JSON.parse(body);
        const trackIdsArray = playlistInfo.tracks.map((item: any) => item.id);
        resolve(trackIdsArray);
      });
    } catch (e) {
      throw new Error(
        "Something went wrong with fetching soundcloud playlist track ids."
      );
    }
  });
}

function search(search: string, limit: any = 10) {
  return new Promise((res, rej) => {
    if (typeof search != "string") throw "Seach term is not type of string";
    if (isNaN(limit)) throw "Not a number";
    if (limit > 100 || limit < 1) throw "Limit must be between 1 and 100";
    if (!clientId) throw "Must set client id with init() first";

    var searchURL =
      "https://api-v2.soundcloud.com/search/tracks?q=SEARCH_TERM&client_id=CLIENT_ID_TERM&limit=LIMIT_TERM";

    searchURL = searchURL
      .replace("CLIENT_ID_TERM", clientId)
      .replace("SEARCH_TERM", encodeURIComponent(search))
      .replace("LIMIT_TERM", limit);

    new Promise((_res, _rej) =>
      request({ url: searchURL }, function (error, response, body) {
        if (error) _rej();

        if (response.statusCode === 200) {
          _res({
            body: JSON.parse(body),
          });
        } else if (response.statusCode === 401) {
          _rej(
            "Soundcloud clientId seems to be invalid. Please try to refresh client Id."
          );
        }
      })
    )
      .then((response: any) => {
        const body = response.body;
        const track_list = body.collection;
        const mappedTracks = track_list.map(trackMapper);

        return res(mappedTracks);
      })
      .catch((e) => {
        rej(e);
      });
  });
}

const getDirectUrls = async (id: any, fromUrl: any) => {
  const url = fromUrl || ((await getItemInfo(id)) as any).url;

  return new Promise((resolve, rej) => {
    request.get(`${url}?client_id=${clientId}`, {}, (err, res, body) => {
      resolve([{ url: JSON.parse(body).url, mimeType: "audio/mpeg" }]);
    });
  });
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

const { https } = require("follow-redirects");
const request = require("request");

clientId = process.env.SOUNDCLOUD_API_KEY;

function getUserTracks(userId, limit = 10) {
  return new Promise((resolve, rej) => {
    let userTracksURL =
      "https://api-v2.soundcloud.com/users/USER_ID_TERM/tracks?client_id=CLIENT_ID_TERM&limit=LIMIT_TERM";

    userTracksURL = userTracksURL
      .replace("USER_ID_TERM", userId)
      .replace("CLIENT_ID_TERM", clientId)
      .replace("LIMIT_TERM", limit);

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

function getUsersPlaylists(userId, limit = 20) {
  return new Promise((resolve, rej) => {
    //playlists_without_albums
    //playlists
    let userPlaylistsURL =
      "https://api-v2.soundcloud.com/users/USER_ID_TERM/playlists_without_albums?client_id=CLIENT_ID_TERM&limit=LIMIT_TERM";

    userPlaylistsURL = userPlaylistsURL
      .replace("USER_ID_TERM", userId)
      .replace("CLIENT_ID_TERM", clientId)
      .replace("LIMIT_TERM", limit);

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

function getSuggestions(searchString, limit = 10) {
  return new Promise((resolve, rej) => {
    //playlists_without_albums
    //playlists
    let suggestionsURL =
      "https://api-v2.soundcloud.com/search/queries?q=SEARCH_TERM&client_id=CLIENT_ID_TERM&limit=LIMIT_TERM";

    suggestionsURL = suggestionsURL
      .replace("SEARCH_TERM", encodeURIComponent(searchString))
      .replace("CLIENT_ID_TERM", clientId)
      .replace("LIMIT_TERM", limit);

    https.get(suggestionsURL, (res) => {
      let data = "";

      res.on("data", (chunk) => {
        data += chunk;
      });

      res.on("end", () => {
        try {
          const response = JSON.parse(data).collection.map(
            (suggestion) => suggestion.output
          );
          resolve(response);
        } catch (e) {
          rej(e);
        }
      });
    });
  });
}

async function getTrackInfo(id) {
  // ili return (await getTracksInfo([id]))[0];
  return new Promise((resolve, rej) => {
    let tracksUrl =
      "https://api-v2.soundcloud.com/tracks/TRACK_ID_TERM?client_id=CLIENT_ID_TERM";

    tracksUrl = tracksUrl
      .replace("TRACK_ID_TERM", id)
      .replace("CLIENT_ID_TERM", clientId);

    request.get(tracksUrl, {}, (err, res, body) => {
      const rawTrackInfo = JSON.parse(body);
      const trackInfo = trackMapper(rawTrackInfo);

      resolve(trackInfo);
    });
  });
}

function getTracksInfo(ids) {
  return new Promise((resolve, rej) => {
    let tracksUrl =
      "https://api-v2.soundcloud.com/tracks?ids=IDS_TERM&client_id=CLIENT_ID_TERM";

    const idsString = encodeURIComponent(ids.join(","));

    tracksUrl = tracksUrl
      .replace("IDS_TERM", idsString)
      .replace("CLIENT_ID_TERM", clientId);

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

async function getPlaylistItems(id) {
  const trackIdsArray = await getPlaylistTrackIds(id);
  const playlistItems = await getTracksInfo(trackIdsArray);
  return playlistItems;
}

async function getPlaylistTrackIds(id) {
  return new Promise(async (resolve, rej) => {
    let playlistUrl =
      "https://api-v2.soundcloud.com/playlists/PLAYLIST_ID_TERM?client_id=CLIENT_ID_TERM";

    playlistUrl = playlistUrl
      .replace("PLAYLIST_ID_TERM", id)
      .replace("CLIENT_ID_TERM", clientId);

    try {
      request.get(playlistUrl, {}, (err, res, body) => {
        const playlistInfo = JSON.parse(body);
        const trackIdsArray = playlistInfo.tracks.map((item) => item.id);
        resolve(trackIdsArray);
      });
    } catch (e) {
      throw new Error(
        "Something went wrong with fetching soundcloud playlist track ids."
      );
    }
  });
}

function searchForTracks(search, limit = 10) {
  return new Promise((res, rej) => {
    if (typeof search != "string") throw "Seach term is not type of string";
    if (isNaN(limit)) throw "Not a number";
    if (limit > 100 || limit < 1) throw "Limit must be between 1 and 100";
    if (!clientId) throw "Must set client id with init() first";

    var searchURL =
      "https://api-v2.soundcloud.com/search/tracks?q=SEARCH_TERM&client_id=CLIENT_ID_TERM&limit=LIMIT_TERM";

    var spaces = search.split(" ");
    for (var i = 0; i < spaces.length; i++) {
      search = search.replace(" ", "%20");
    }

    searchURL = searchURL
      .replace("CLIENT_ID_TERM", clientId)
      .replace("SEARCH_TERM", search)
      .replace("LIMIT_TERM", limit);

    new Promise((_res, _rej) =>
      request({ url: searchURL }, function (error, response, body) {
        if (error) _rej();

        if (!error && response.statusCode === 200) {
          _res({
            body: JSON.parse(body),
          });
        }
      })
    )
      .then((response) => {
        const body = response.body;
        const track_list = body.collection;
        const mappedTracks = track_list.map(trackMapper);

        return res(mappedTracks);
      })
      .catch(() => {
        rej();
      });
  });
}

const getDirectUrl = async (id, fromUrl) => {
  const url = fromUrl || (await getTrackInfo(id).url);

  return new Promise((resolve, rej) => {
    request.get(`${url}?client_id=${clientId}`, {}, (err, res, body) => {
      resolve(JSON.parse(body).url);
    });
  });
};

module.exports = {
  searchForTracks,
  getTrackInfo,
  getPlaylistItems,
  getUserTracks,
  getSuggestions,
  getUsersPlaylists,
  getDirectUrl,
};

const trackMapper = (item) => {
  const progressiveTranscoding = item.media.transcodings.find(
    (item) => item.format.protocol === "progressive"
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
      url: item.user.permalink_url,
      id: item.user.id,
      name: item.user.username,
      avatars: [{ url: item.user.avatar_url }],
    },
    views: item.playback_count,
    type: "video",
  };
};

const playlistMapper = (item) => {
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

const intoHHMMSS = (durationMs) =>
  new Date(durationMs)
    .toISOString()
    .substr(11, 8)
    .replace(/^[0:]+/, "");

// searchForTracks("idontknowjeffery").then((res) => {
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

// getTrackInfo(983132659).then((res) => {
//   var bla = 2;
// });

// getPlaylistInfo(1211028727).then((res) => {
//   require("fs").writeFileSync(
//     "playlistINFo.json",
//     JSON.stringify(res, null, 2)
//   );
// });

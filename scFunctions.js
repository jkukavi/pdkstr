const { https } = require("follow-redirects");
const request = require("request");

clientId = process.env.SOUNDCLOUD_API_KEY;

function getUsersPlaylists(userId, limit = 10) {
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
        resolve(JSON.parse(data).collection.map(mapper));
      });
    });
  });
}

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
        resolve(JSON.parse(data).collection.map(mapper));
      });
    });
  });
}

function getTracks(search, limit = 10) {
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

    const promise = new Promise((_res, _rej) =>
      request({ url: searchURL }, function (error, response, body) {
        if (error) return _rej(new Error(error));

        if (!error && response.statusCode === 200) {
          return _res({
            body: JSON.parse(body),
          });
        }
      })
    );

    promise.then((response) => {
      const body = response.body;
      const track_list = body.collection;
      const mappedTracks = track_list.map(mapper);

      return res(mappedTracks);
    });
  });
}

const getDirectUrl = (url) => {
  return new Promise((resolve, rej) => {
    request.get(`${url}?client_id=${clientId}`, {}, (err, res, body) => {
      resolve(JSON.parse(body).url);
    });
  });
};

module.exports = {
  getTracks,
  getUserTracks,
  getUsersPlaylists,
  getDirectUrl,
};

const mapper = (item) => {
  return {
    // url: item.permalink_url,
    url: item.media.transcodings.find(
      (item) => item.format.protocol === "progressive"
    ).url,
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

const intoHHMMSS = (durationMs) =>
  new Date(durationMs)
    .toISOString()
    .substr(11, 8)
    .replace(/^[0:]+/, "");

const { https } = require("follow-redirects");
const request = require("request");

class ScSearcher {
  constructor() {
    this.client_id = null || process.env.SOUNDCLOUD_API_KEY;
  }

  getUsersPlaylists(userId, limit) {
    return new Promise((resolve, rej) => {
      //playlists_without_albums
      //playlists
      let userPlaylistsURL =
        "https://api-v2.soundcloud.com/users/USER_ID_TERM/playlists?client_id=CLIENT_ID_TERM&limit=LIMIT_TERM";

      userPlaylistsURL = userPlaylistsURL
        .replace("USER_ID_TERM", userId)
        .replace("CLIENT_ID_TERM", this.client_id)
        .replace("LIMIT_TERM", limit);

      https.get(userPlaylistsURL, (res) => {
        let data = "";

        res.on("data", (chunk) => {
          data += chunk;
        });

        res.on("end", () => {
          resolve(JSON.parse(data));
        });
      });
    });
  }

  getUserTracks(userId, limit) {
    return new Promise((resolve, rej) => {
      let userTracksURL =
        "https://api-v2.soundcloud.com/users/USER_ID_TERM/tracks?client_id=CLIENT_ID_TERM&limit=LIMIT_TERM";

      userTracksURL = userTracksURL
        .replace("USER_ID_TERM", userId)
        .replace("CLIENT_ID_TERM", this.client_id)
        .replace("LIMIT_TERM", limit);

      https.get(userTracksURL, (res) => {
        let data = "";

        res.on("data", (chunk) => {
          data += chunk;
        });

        res.on("end", () => {
          resolve(JSON.parse(data));
        });
      });
    });
  }

  getTracks(search, limit, callback) {
    return new Promise((res, rej) => {
      if (typeof search != "string") throw "Seach term is not type of string";
      if (isNaN(limit)) throw "Not a number";
      if (limit > 100 || limit < 1) throw "Limit must be between 1 and 100";
      if (!this.client_id) throw "Must set client id with init() first";

      var searchURL =
        "https://api-v2.soundcloud.com/search/tracks?q=SEARCH_TERM&client_id=CLIENT_ID_TERM&limit=LIMIT_TERM";

      var spaces = search.split(" ");
      for (var i = 0; i < spaces.length; i++) {
        search = search.replace(" ", "%20");
      }

      searchURL = searchURL
        .replace("CLIENT_ID_TERM", this.client_id)
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

        return res(track_list);
      });
    });
  }
}

module.exports = ScSearcher;

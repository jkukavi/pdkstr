const dotenv = require("dotenv");
dotenv.config();
const scHandlers = require("./scFunctions.js");

const soundcloudDummyData = {
  itemId: "430754811",
  playlistId: "1211028727",
  channelId: "55254934",
};

describe("Testing soundcloud scraper", () => {
  test("should return results for search", async (done) => {
    const searchResultsArray = await scHandlers.search("idkjeffery");
    expect(Array.isArray(searchResultsArray)).toBe(true);
    done();
  });

  test("should return array of string suggestions when given string", async (done) => {
    const suggestions = await scHandlers.getSuggestions("idkjeffery");
    expect(Array.isArray(suggestions)).toBe(true);
    done();
  });

  test("should return direct url when given item id", async (done) => {
    const directUrl = await scHandlers.getDirectUrl(soundcloudDummyData.itemId);
    expect(typeof directUrl === "string").toBe(true);
    done();
  });

  it("should return playlist items when given soundcloud playlist Id", async (done) => {
    const searchResultsArray = await scHandlers.getPlaylistItems(
      soundcloudDummyData.playlistId
    );
    expect(Array.isArray(searchResultsArray)).toBe(true);
    done();
  });

  it("should return channel items when given soundcloud channel Id", async (done) => {
    const searchResultsArray = await scHandlers.getChannelItems(
      soundcloudDummyData.channelId
    );
    expect(Array.isArray(searchResultsArray)).toBe(true);
    done();
  });

  it("should return channel playlists when given soundcloud channel Id", async (done) => {
    const searchResultsArray = await scHandlers.getChannelPlaylists(
      soundcloudDummyData.channelId
    );
    expect(Array.isArray(searchResultsArray)).toBe(true);
    done();
  });
});

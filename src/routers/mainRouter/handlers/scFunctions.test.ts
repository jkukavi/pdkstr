import dotenv from "dotenv";
import scHandlers from "./scFunctions";

dotenv.config();

const soundcloudDummyData = {
  itemId: "430754811",
  playlistId: "1211028727",
  channelId: "55254934",
};

describe("Testing soundcloud scraper", () => {
  test("should return results for search", async () => {
    const searchResultsArray = await scHandlers.search("idkjeffery");
    expect(Array.isArray(searchResultsArray)).toBe(true);
  });

  test("should return array of string suggestions when given string", async () => {
    const suggestions = await scHandlers.getSuggestions("idkjeffery");
    expect(Array.isArray(suggestions)).toBe(true);
  });

  test("should return direct url when given item id", async () => {
    const directUrl = await scHandlers.getDirectUrl(
      soundcloudDummyData.itemId,
      null
    );
    expect(typeof directUrl === "string").toBe(true);
  });

  it("should return playlist items when given soundcloud playlist Id", async () => {
    const searchResultsArray = await scHandlers.getPlaylistItems(
      soundcloudDummyData.playlistId
    );
    expect(Array.isArray(searchResultsArray)).toBe(true);
  });

  it("should return channel items when given soundcloud channel Id", async () => {
    const searchResultsArray = await scHandlers.getChannelItems(
      soundcloudDummyData.channelId
    );
    expect(Array.isArray(searchResultsArray)).toBe(true);
  });

  it("should return channel playlists when given soundcloud channel Id", async () => {
    const searchResultsArray = await scHandlers.getChannelPlaylists(
      soundcloudDummyData.channelId
    );
    expect(Array.isArray(searchResultsArray)).toBe(true);
  });
});
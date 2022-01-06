import dotenv from "dotenv";
import scHandlers from "../handlers/scFunctions";

dotenv.config();

const soundcloudDummyData = {
  itemId: "430754811",
  playlistId: "1211028727",
  channelId: "55254934",
};

describe("Testing soundcloud scraper", () => {
  test("should return search results", async () => {
    const searchResultsArray = await scHandlers.search("idkjeffery");

    expect(Array.isArray(searchResultsArray)).toBe(true);
  });

  test("should return array of search suggestions when given search string", async () => {
    const suggestions = await scHandlers.getSuggestions("idkjeffery");
    expect(Array.isArray(suggestions)).toBe(true);
    expect(
      suggestions.every((suggestion: any) => typeof suggestion === "string")
    ).toBe(true);
  });

  test("should return direct url when given item id", async () => {
    const directUrls: any = await scHandlers.getDirectUrls(
      soundcloudDummyData.itemId,
      null
    );
    expect(typeof directUrls[0].url).toBe("string");
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

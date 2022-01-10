import dotenv from "dotenv";
import scHandlers from "../handlers/scFunctions";
import nock from "nock";
import { soundcloudDummyData } from "./dummyData";

nock.back.setMode("record");
nock.back.fixtures = __dirname + "/nockFixtures";

dotenv.config();

describe("Testing soundcloud scraper", () => {
  test("should return search results", async () => {
    const { nockDone } = await nock.back("search.json");
    const searchResultsArray = await scHandlers.search("idkjeffery");

    expect(Array.isArray(searchResultsArray)).toBe(true);
    nockDone();
  });

  test("should return array of search suggestions when given search string", async () => {
    const { nockDone } = await nock.back("suggestions.json");

    const suggestions = await scHandlers.getSuggestions("idkjeffery");
    expect(Array.isArray(suggestions)).toBe(true);
    expect(
      suggestions.every((suggestion: any) => typeof suggestion === "string")
    ).toBe(true);

    nockDone();
  });

  test("should return direct url when given item id", async () => {
    const { nockDone } = await nock.back("directUrl.json");

    const directUrls: any = await scHandlers.getDirectUrls(
      soundcloudDummyData.itemId,
      null
    );
    expect(typeof directUrls[0].url).toBe("string");

    nockDone();
  });

  it("should return playlist items when given soundcloud playlist Id", async () => {
    const { nockDone } = await nock.back("playlistItems.json");
    const searchResultsArray = await scHandlers.getPlaylistItems(
      soundcloudDummyData.playlistId
    );
    expect(Array.isArray(searchResultsArray)).toBe(true);
    nockDone();
  });

  it("should return channel items when given soundcloud channel Id", async () => {
    const { nockDone } = await nock.back("userChannelItems.json");
    const searchResultsArray = await scHandlers.getChannelItems(
      soundcloudDummyData.channelId
    );
    expect(Array.isArray(searchResultsArray)).toBe(true);
    nockDone();
  });

  it("should return channel playlists when given soundcloud channel Id", async () => {
    const { nockDone } = await nock.back("channelPlaylists.json");
    const searchResultsArray = await scHandlers.getChannelPlaylists(
      soundcloudDummyData.channelId
    );
    expect(Array.isArray(searchResultsArray)).toBe(true);
    nockDone();
  });
});

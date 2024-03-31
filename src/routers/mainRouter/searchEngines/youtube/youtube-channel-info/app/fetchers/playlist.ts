// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { resolve } from "./resolver";
import { PlaylistResponse } from "./playlistTypes";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const helper = require("../helper");

class PlaylistFetcher {
  getOriginalURL: () => any;

  constructor(url) {
    const _url = url;
    this.getOriginalURL = () => _url;
  }

  static async getChannelPlaylistLast(channelId, channelIdType) {
    const channelPageResponse = await helper.decideUrlRequestType(
      channelId,
      "playlists?flow=grid&sort=lad&view=1&pbj=1",
      channelIdType
    );
    return await this.parseChannelPlaylistResponse(
      channelPageResponse.response,
      channelPageResponse.channelIdType
    );
  }

  static async getChannelPlaylistOldest(channelId, channelIdType) {
    const channelPageResponse = await helper.decideUrlRequestType(
      channelId,
      "playlists?view=1&sort=da&flow=grid&pbj=1",
      channelIdType
    );
    return await this.parseChannelPlaylistResponse(
      channelPageResponse.response,
      channelPageResponse.channelIdType
    );
  }

  static async getChannelPlaylistNewest(channelId, channelIdType) {
    const channelPageResponse = await helper.decideUrlRequestType(
      channelId,
      "playlists?view=1&sort=dd&flow=grid&pbj=1",
      channelIdType
    );
    return await this.parseChannelPlaylistResponse(
      channelPageResponse.response,
      channelPageResponse.channelIdType
    );
  }

  static async parseChannelPlaylistResponse(response, channelIdType) {
    const channelMetaData =
      response.data.response.metadata.channelMetadataRenderer;
    const channelName = channelMetaData.title;
    const channelId = channelMetaData.externalId;

    const channelInfo = {
      channelId: channelId,
      channelName: channelName,
      channelUrl: `https://www.youtube.com/channel/${channelId}`,
    };

    const resolvers = [
      (response: PlaylistResponse) =>
        response.data.response.contents.twoColumnBrowseResultsRenderer.tabs[3]
          .tabRenderer.content.sectionListRenderer.contents[0]
          .itemSectionRenderer.contents[0].gridRenderer,
      (response: any) =>
        response.data.response.contents.twoColumnBrowseResultsRenderer.tabs[2]
          .tabRenderer.content.sectionListRenderer.contents[0]
          .itemSectionRenderer.contents[0].gridRenderer,
    ];

    const playlistData = resolve(response, resolvers);

    if (typeof playlistData === "undefined") {
      return {
        continuation: null,
        items: [],
      };
    }

    const playlistItems = playlistData.items
      .filter((playlist: any) => {
        return (
          typeof playlist.gridShowRenderer === "undefined" &&
          typeof playlist.continuationItemRenderer === "undefined"
        );
      })
      .map((playlist) => {
        const item = helper.parsePlaylist(playlist, channelInfo);
        if (item !== null) {
          return item;
        }
      });

    let continuation = null;

    const continuationItem = playlistData.items.filter((item: any) => {
      return typeof item.continuationItemRenderer !== "undefined";
    });

    if (
      typeof continuationItem !== "undefined" &&
      continuationItem.length > 0
    ) {
      continuation = null;
    }

    return {
      continuation: continuation,
      items: playlistItems,
      channelIdType: channelIdType,
    };
  }
}

module.exports = PlaylistFetcher;

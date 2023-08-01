// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { ChannelPlaylist } from "routers/mainRouter/searchEngines/youtube";
import { TopicItemResponse } from "routers/mainRouter/searchEngines/youtube/youtube-channel-info/app/fetchers/topicType";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const helper = require("../helper");
// eslint-disable-next-line @typescript-eslint/no-var-requires

const checkIfTopicChannel = (response: any) => {
  let isTopic = false;

  try {
    isTopic =
      response.response.data[1].response.metadata.channelMetadataRenderer.title
        .toLowerCase()
        .includes("topic");
  } catch (e) {
    isTopic = false;
  }

  return isTopic;
};

class YoutubeChannelFetcher {
  constructor(id, continuation) {
    this.continuation = continuation;
  }

  static async getChannelVideosNewest(channelId, channelIdType) {
    const channelPageResponse = await helper.decideUrlRequestType(
      channelId,
      "videos?flow=grid&view=0&pbj=1",
      channelIdType
    );

    const isTopic = checkIfTopicChannel(channelPageResponse);

    if (isTopic) {
      return this.parseTopicChannelItemsResponse(channelPageResponse);
    } else {
      return await helper.parseChannelVideoResponse(
        channelPageResponse.response,
        channelId,
        channelPageResponse.channelIdType
      );
    }
  }

  static async parseTopicChannelItemsResponse(response: TopicItemResponse): {
    isTopicChannel: true;
    items: ChannelPlaylist[];
  } {
    const items =
      response.response.data[1].response.contents.twoColumnBrowseResultsRenderer
        .tabs[0].tabRenderer.content.sectionListRenderer.contents[0]
        .itemSectionRenderer.contents[0].shelfRenderer.content
        .horizontalListRenderer.items;

    return {
      isTopicChannel: true,
      items: items
        .map((item) => item.gridPlaylistRenderer)
        .map((item) => ({
          author: "",
          authorId: "",
          authorUrl: "",
          playlistId: item.playlistId,
          playlistThumbnail: item.thumbnail?.thumbnails[0]?.url || "",
          playlistUrl: "",
          title: item.title.runs[0].text,
          type: "playlist",
          videoCount: item.videoCountText.runs[0].text,
        })),
    };
  }

  static async getChannelVideosOldest(channelId, channelIdType) {
    const channelPageResponse = await helper.decideUrlRequestType(
      channelId,
      "videos?view=0&sort=da&flow=grid&pbj=1",
      channelIdType
    );
    return await helper.parseChannelVideoResponse(
      channelPageResponse.response,
      channelId,
      channelPageResponse.channelIdType
    );
  }

  static async getChannelVideosPopular(channelId, channelIdType) {
    const channelPageResponse = await helper.decideUrlRequestType(
      channelId,
      "videos?view=0&sort=p&flow=grid&pbj=1",
      channelIdType
    );
    return await helper.parseChannelVideoResponse(
      channelPageResponse.response,
      channelId,
      channelPageResponse.channelIdType
    );
  }
}

module.exports = YoutubeChannelFetcher;

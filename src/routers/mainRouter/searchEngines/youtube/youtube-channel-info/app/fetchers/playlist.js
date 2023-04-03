"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const helper = require("../helper");
class PlaylistFetcher {
    constructor(url) {
        const _url = url;
        this.getOriginalURL = () => _url;
    }
    static getChannelPlaylistLast(channelId, channelIdType) {
        return __awaiter(this, void 0, void 0, function* () {
            const channelPageResponse = yield helper.decideUrlRequestType(channelId, "playlists?flow=grid&sort=lad&view=1&pbj=1", channelIdType);
            return yield this.parseChannelPlaylistResponse(channelPageResponse.response, channelPageResponse.channelIdType);
        });
    }
    static getChannelPlaylistOldest(channelId, channelIdType) {
        return __awaiter(this, void 0, void 0, function* () {
            const channelPageResponse = yield helper.decideUrlRequestType(channelId, "playlists?view=1&sort=da&flow=grid&pbj=1", channelIdType);
            return yield this.parseChannelPlaylistResponse(channelPageResponse.response, channelPageResponse.channelIdType);
        });
    }
    static getChannelPlaylistNewest(channelId, channelIdType) {
        return __awaiter(this, void 0, void 0, function* () {
            const channelPageResponse = yield helper.decideUrlRequestType(channelId, "playlists?view=1&sort=dd&flow=grid&pbj=1", channelIdType);
            return yield this.parseChannelPlaylistResponse(channelPageResponse.response, channelPageResponse.channelIdType);
        });
    }
    static parseChannelPlaylistResponse(response, channelIdType) {
        return __awaiter(this, void 0, void 0, function* () {
            const channelMetaData = response.data[1].response.metadata.channelMetadataRenderer;
            const channelName = channelMetaData.title;
            const channelId = channelMetaData.externalId;
            const channelInfo = {
                channelId: channelId,
                channelName: channelName,
                channelUrl: `https://www.youtube.com/channel/${channelId}`,
            };
            let playlistData;
            try {
                playlistData = response.data[1].response.contents
                    .twoColumnBrowseResultsRenderer.tabs[4].tabRenderer.content
                    .sectionListRenderer.contents[0].itemSectionRenderer.contents[0]
                    .gridRenderer;
            }
            catch (_a) {
                playlistData =
                    response.data[1].response.contents.twoColumnBrowseResultsRenderer
                        .tabs[2].tabRenderer.content.sectionListRenderer.contents[0]
                        .itemSectionRenderer.contents[0].gridRenderer;
            }
            if (typeof playlistData === "undefined") {
                return {
                    continuation: null,
                    items: [],
                };
            }
            const playlistItems = playlistData.items
                .filter((playlist) => {
                return (typeof playlist.gridShowRenderer === "undefined" &&
                    typeof playlist.continuationItemRenderer === "undefined");
            })
                .map((playlist) => {
                const item = helper.parsePlaylist(playlist, channelInfo);
                if (item !== null) {
                    return item;
                }
            });
            let continuation = null;
            const continuationItem = playlistData.items.filter((item) => {
                return typeof item.continuationItemRenderer !== "undefined";
            });
            if (typeof continuationItem !== "undefined" &&
                continuationItem.length > 0) {
                continuation = null;
            }
            return {
                continuation: continuation,
                items: playlistItems,
                channelIdType: channelIdType,
            };
        });
    }
}
module.exports = PlaylistFetcher;

interface Thumbnail {
  url: string;
}

interface Item {
  key?: string;
  engine: Engine;
  type: "item";
  title: string;
  id: string;
  url: string;
  bestThumbnail: Thumbnail;
  thumbnails: Thumbnail[];
  author: {
    name: string;
    channelID: string;
    url: string;
    bestAvatar: Thumbnail;
    avatars: Thumbnail[];
  };
  views: number;
  duration: string;
  uploadedAt: string;
}

interface ChannelInfo {
  name: string;
  avatar: string;
  subscribers: string;
}

interface Channel {
  engine: Engine;
  type: "channel";
  name: string;
  channelID: string;
  url: string;
  bestAvatar: Thumbnail;
  avatars: Thumbnail[];
  verified: boolean;
  subscribers: string;
  videos: number;
  key?: string;
}

interface Playlist {
  key?: string;
  type: "playlist";
  engine: Engine;
  title: string;
  id: string;
  playlistID: string;
  length: number;
  playlistLength: number;
  url: string;
  thumbnails: Thumbnail[];
  owner: {
    name: string;
    channelID: string;
    url: string;
  };
}

type AnyItem = Channel | Item | Playlist;

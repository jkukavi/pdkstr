interface Item {
  title: string;
  engine: string;
  type: "video";
  author: {
    name: string;
    avatars: { url: any }[];
  };
  thumbnails: any[];
  duration: string;
  uploadedAt: string;
  views: string;

  key: string;
}

interface Channel {
  type: "channel";
  bestAvatar: {
    url: string;
  };
  name: string;
  subscribers: string;
  key: string;
}

type VoidFunction = () => void;

interface Playlist {
  type: "playlist";
  title: string;
  engine: string;
  length: string;
  thumbnails: { url: string }[];
  key: string;
}

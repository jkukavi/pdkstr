interface Item {
  title: string;
  engine: string;
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
  bestAvatar: {
    url: string;
  };
  name: string;
  subscribers: string;
  key: string;
}

type VoidFunction = () => void;

interface Playlist {
  title: string;
  engine: string;
  length: string;
  thumbnails: { url: string }[];
  key: string;
}

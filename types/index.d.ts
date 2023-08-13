interface UserInfo {
  username: string;
  email: string;
  password: string;
}

interface PendingAccount {
  accountInfo: UserInfo;
  activationCode: string;
}

type Engine = "youtube" | "soundcloud";

interface EngineMethods {
  ping: any;
  getDirectUrls: any;
  search: any;
  getPlaylistItems: any;
  getChannelInfo: any;
  getChannelItems: any;
  getChannelPlaylists: any;
  getItemInfo: any;
  getSuggestions: any;
}

type Engines = {
  [key in Engine]: EngineMethods;
};

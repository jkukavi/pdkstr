interface UserInfo {
  username: string;
  email: string;
  password: string;
}

type AccountInfo = {
  history: string[];
  favourites: string[];
} & UserInfo;

interface PendingAccount {
  accountInfo: AccountInfo;
  activationCode: string;
}

type Engine = "youtube" | "soundcloud";

interface EngineMethods {
  ping: any;
  getDirectUrls: any;
  search: any;
  getPlaylistItems: any;
  getChannelItems: any;
  getChannelPlaylists: any;
  getItemInfo: any;
  getSuggestions: any;
}

type Engines = {
  [key in Engine]: EngineMethods;
};

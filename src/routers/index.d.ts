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

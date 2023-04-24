import { hashPasswordIn } from "models/helpers";
import { getRandomCode } from "utils";

export const youtubeDummyData = {
  itemId: "eJRvRM9wfdE",
  playlistId: "PLhkF-IG09XgBkFiy4ftTmQIsUOiKBYjfM",
  channelId: "UCtPlB4OmowajcgVaL3jvGcA",
  suggestionQuery: "doggo",
};

export const soundcloudDummyData = {
  itemId: "430754811",
  playlistId: "1211028727",
  channelId: "55254934",
};

const blankUserInfo = {
  username: "userRouterName",
  history: [],
  favourites: [],
};

export const generateUniqueDummyUser = async (
  uniqueId: string
): Promise<{ user: UserInfo; userWithHashedPassword: UserInfo }> => {
  const password = getRandomCode();
  const user = {
    ...blankUserInfo,
    email: `${uniqueId}@mail.com`,
    password,
  };
  return {
    user,
    userWithHashedPassword: await hashPasswordIn(user),
  };
};

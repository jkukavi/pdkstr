import { hashPasswordIn } from "models/helpers";
import { getRandomCode } from "utils";

export const youtubeDummyData = {
  itemId: "eJRvRM9wfdE",
  playlistId: "PLYu-7OugCfta0mrJ5fRKvXfjU3qwgWZxS",
  channelId: "UCtPlB4OmowajcgVaL3jvGcA",
  suggestionQuery: "doggo",
};

export const soundcloudDummyData = {
  itemId: "430754811",
  playlistId: "1211028727",
  channelId: "55254934",
};

const blankAccountInfo = {
  username: "userRouterName",
  history: [],
  favourites: [],
};

export const generateUniqueDummyUser = async (
  uniqueId: string
): Promise<{ user: AccountInfo; userWithHashedPassword: AccountInfo }> => {
  const password = getRandomCode();
  const user = {
    ...blankAccountInfo,
    email: `${uniqueId}@mail.com`,
    password,
  };
  return {
    user,
    userWithHashedPassword: await hashPasswordIn(user),
  };
};

import { hashPasswordIn } from "models/helpers";
import { ObjectId } from "mongodb";
import { getRandomCode } from "utils";
import users from "models/user";

function getRandomItemType() {
  const types = ["item", "playlist", "channel"];
  const randomIndex = Math.floor(Math.random() * types.length);
  return types[randomIndex];
}

const createArray = (n: number) => {
  const newArray = new Array(n);
  return newArray.fill("dummy_string_so_this_array_can_be_iterated_on");
};

export const createHistoryForUser = (userId: string) =>
  createArray(100)
    .map(() => {
      return {
        type: "item",
        title: "HIT ME FIRST - idontknowjeffery ( OFFICIAL VIDEO )",
        id: "IV0arm42PMM",
        url: "https://www.youtube.com/watch?v=IV0arm42PMM",
        bestThumbnail: {
          url: "https://i.ytimg.com/vi/IV0arm42PMM/hq720.jpg?sqp=-oaymwEXCNAFEJQDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLAzhZKDWeo2rHE1ZAGWo3pX4gSOQw",
          width: 720,
          height: 404,
        },
        thumbnails: [
          {
            url: "https://i.ytimg.com/vi/IV0arm42PMM/hq720.jpg?sqp=-oaymwEXCNAFEJQDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLAzhZKDWeo2rHE1ZAGWo3pX4gSOQw",
            width: 720,
            height: 404,
          },
          {
            url: "https://i.ytimg.com/vi/IV0arm42PMM/hq720.jpg?sqp=-oaymwEjCOgCEMoBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLB6StR_n3yh8MZHem6Eod9QjdeErg",
            width: 360,
            height: 202,
          },
        ],
        isUpcoming: false,
        upcoming: null,
        isLive: false,
        badges: ["4K"],
        author: {
          name: "IDONTKNOWJEFFERY",
          channelID: "UCtPlB4OmowajcgVaL3jvGcA",
          url: "https://www.youtube.com/channel/UCtPlB4OmowajcgVaL3jvGcA",
          bestAvatar: {
            url: "https://yt3.ggpht.com/ytc/AKedOLQr0-cF8WJKsegv_DZdfHvcU4YGSrXRi2OCqHyPbg=s88-c-k-c0x00ffffff-no-rj",
            width: 68,
            height: 68,
          },
          avatars: [
            {
              url: "https://yt3.ggpht.com/ytc/AKedOLQr0-cF8WJKsegv_DZdfHvcU4YGSrXRi2OCqHyPbg=s88-c-k-c0x00ffffff-no-rj",
              width: 68,
              height: 68,
            },
          ],
          ownerBadges: ["Official Artist Channel"],
          verified: true,
          type: "channel",
        },
        description: null,
        views: 545154,
        duration: "2:36",
        uploadedAt: "3 years ago",
        engine: "youtube",
        key: "632a192e-4c69-4881-b9de-eb4f0684bc70",
      };
    })
    .map((item) => ({ data: item, user_id: new ObjectId(userId) }));

export const createFavouritesForUser = (userId: string) =>
  createArray(10)
    .map((a, i) => ({
      index: i,
      type: getRandomItemType(),
      title: "HIT ME FIRST - idontknowjeffery ( OFFICIAL VIDEO )",
      id: "IV0arm42PMM",
      url: "https://www.youtube.com/watch?v=IV0arm42PMM",
      bestThumbnail: {
        url: "https://i.ytimg.com/vi/IV0arm42PMM/hq720.jpg?sqp=-oaymwEXCNAFEJQDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLAzhZKDWeo2rHE1ZAGWo3pX4gSOQw",
        width: 720,
        height: 404,
      },
      thumbnails: [
        {
          url: "https://i.ytimg.com/vi/IV0arm42PMM/hq720.jpg?sqp=-oaymwEXCNAFEJQDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLAzhZKDWeo2rHE1ZAGWo3pX4gSOQw",
          width: 720,
          height: 404,
        },
        {
          url: "https://i.ytimg.com/vi/IV0arm42PMM/hq720.jpg?sqp=-oaymwEjCOgCEMoBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLB6StR_n3yh8MZHem6Eod9QjdeErg",
          width: 360,
          height: 202,
        },
      ],
      isUpcoming: false,
      upcoming: null,
      isLive: false,
      badges: ["4K"],
      author: {
        name: "IDONTKNOWJEFFERY",
        channelID: "UCtPlB4OmowajcgVaL3jvGcA",
        url: "https://www.youtube.com/channel/UCtPlB4OmowajcgVaL3jvGcA",
        bestAvatar: {
          url: "https://yt3.ggpht.com/ytc/AKedOLQr0-cF8WJKsegv_DZdfHvcU4YGSrXRi2OCqHyPbg=s88-c-k-c0x00ffffff-no-rj",
          width: 68,
          height: 68,
        },
        avatars: [
          {
            url: "https://yt3.ggpht.com/ytc/AKedOLQr0-cF8WJKsegv_DZdfHvcU4YGSrXRi2OCqHyPbg=s88-c-k-c0x00ffffff-no-rj",
            width: 68,
            height: 68,
          },
        ],
        ownerBadges: ["Official Artist Channel"],
        verified: true,
        type: "channel",
      },
      description: null,
      views: 545154,
      duration: "2:36",
      uploadedAt: "3 years ago",
      engine: "youtube",
      key: "632a192e-4c69-4881-b9de-eb4f0684bc70",
    }))
    .map((item) => ({ data: item, user_id: new ObjectId(userId) }));

const createUser = (): UserInfo & { _id: ObjectId } => ({
  _id: new ObjectId(),
  email: `test+${getRandomCode()}@podkaster.com`,
  password: getRandomCode(),
  username: `test${getRandomCode()}`,
});

const createDummyUser = async () => {
  const user = createUser();
  const userId = user._id.toString();
  const userWithHashedPassword = await hashPasswordIn(user);
  let insertionResult;
  try {
    insertionResult = await users.save(userWithHashedPassword);
  } catch (e) {
    2;
  }

  if (!insertionResult) {
    throw new Error("Unable to save user.");
  }

  const usersHistory = createHistoryForUser(userId);
  const usersFavourites = createFavouritesForUser(userId);

  await users.populateHistoryAndFavourites(usersHistory, usersFavourites);

  return {
    dummyUser: user,
    usersHistory: usersHistory.reverse(),
    usersFavourites: usersFavourites.reverse(),
  };
};

export { createDummyUser };

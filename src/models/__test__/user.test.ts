import users from "../user";
import { connect, close } from "db";
import { createDummyUser } from "__test__/createUser";

describe("CRUD operations for users collection", () => {
  let user: UserInfo;
  let history: any = [];
  let favourites: any = [];
  const dummyItem = { name: "bla", author: "bla", type: "video" };

  let id: string;

  beforeAll(async () => {
    await connect();
    const { dummyUser, usersHistory, usersFavourites } =
      await createDummyUser();
    id = dummyUser._id.toString();
    user = dummyUser;
    history = usersHistory;
    favourites = usersFavourites;
  });

  afterAll(async () => {
    await close();
  });

  it("should find user from id", async () => {
    const retrievedUser = await users.findById(id);
    if (!retrievedUser) {
      throw new Error("Unable to find user from id.");
    }
    expect(retrievedUser.email).toBe(user.email);
  });

  it("should find user from credentials", async () => {
    const retrievedUser = await users.findByCredentials({
      email: user.email,
      password: user.password,
    });
    if (!retrievedUser) {
      throw new Error("Unable to find user from credentials.");
    }
    expect(retrievedUser.email).toBe(user.email);
  });

  it("should retrieve users history array from users id", async () => {
    const retrievedHistoryArray = await users.getMyHistory(id, "item", "");
    expect(retrievedHistoryArray[0]).toMatchObject(history[0].data);
  });

  const itemTypeByType = {
    item: "video",
    playlist: "playlist",
    channel: "channel",
  };

  it("should retrieve users favourites array from users id", async () => {
    const itemTypes = ["item", "playlist", "channel"] as const;

    for (let itemType of itemTypes) {
      const trueType = itemTypeByType[itemType];

      const favouritesArray = favourites.map((item: any) => item.data);

      const lastInsertedFavouriteOfASpecificType = favouritesArray.find(
        (item: any) => item.type == trueType
      );

      const retrievedFavouritesOfSpecificType = await users.getMyFavourites(
        id,
        itemType,
        ""
      );

      const lastRetrievedFavouriteOfSpecificType =
        retrievedFavouritesOfSpecificType[0];

      expect(lastRetrievedFavouriteOfSpecificType).toMatchObject(
        lastInsertedFavouriteOfASpecificType
      );
    }
  });

  it("should add item to users history", async () => {
    await users.addItemToHistory(id, dummyItem);
    const retrievedHistoryArray = await users.getMyHistory(id, "item", "");
    const lastAddedItemToHistory = retrievedHistoryArray[0];
    expect(lastAddedItemToHistory).toMatchObject(dummyItem);
  });

  it("should add item to users favourites", async () => {
    await users.addItemToFavourites(id, dummyItem);
    const retrievedFavouritesArray = await users.getMyFavourites(
      id,
      "item",
      ""
    );
    const lastAddedItemToFavourites = retrievedFavouritesArray[0];
    expect(lastAddedItemToFavourites).toMatchObject(dummyItem);
  });
});

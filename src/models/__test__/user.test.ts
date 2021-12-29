import users from "../user";
import { hashPasswordIn } from "../helpers";
import { connect, close } from "db";

describe("CRUD operations for users collection", () => {
  const user: AccountInfo = {
    email: "userModel@test",
    username: "usernamio",
    password: "hello",
    history: [],
    favourites: [],
  };
  let userWithHashedPassword = user;
  const dummyItem = { name: "bla", author: "bla" };

  let id: string;

  beforeAll(async () => {
    await connect();
    userWithHashedPassword = await hashPasswordIn(user);
  });

  afterAll(async () => {
    await close();
  });

  beforeEach(async () => {
    const insertionResult = await users.save(userWithHashedPassword);

    if (!insertionResult) {
      throw new Error("Unable to save user.");
    }

    id = insertionResult?.insertedId.toString();
  });

  afterEach(async () => {
    if (id) {
      await users.removeById(id);
    }
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
    const retrievedHistoryArray = await users.getMyHistory(id);
    expect(retrievedHistoryArray).toEqual(user.history);
  });

  it("should retrieve users favourites array from users id", async () => {
    const retrievedFavouritesArray = await users.getMyFavourites(id);
    expect(retrievedFavouritesArray).toEqual(user.favourites);
  });

  it("should add item to users history", async () => {
    await users.addItemToHistory(id, dummyItem);
    const retrievedHistoryArray = await users.getMyHistory(id);
    const lastAddedItemToHistory = retrievedHistoryArray[0];
    expect(lastAddedItemToHistory).toEqual(dummyItem);
  });

  it("should add item to users favourites", async () => {
    await users.addItemToFavourites(id, dummyItem);
    const retrievedFavouritesArray = await users.getMyFavourites(id);
    const lastAddedItemToFavourites = retrievedFavouritesArray[0];
    expect(lastAddedItemToFavourites).toEqual(dummyItem);
  });
});

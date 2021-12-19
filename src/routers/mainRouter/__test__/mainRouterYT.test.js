const dotenv = require("dotenv");
dotenv.config();
const supertest = require("supertest");
const users = require("../../models/user");
const app = require("../../app");
const { connect, close } = require("../../db");
const { getRandomCode } = require("../../utils");
const { hashPasswordIn } = require("../../models/helpers");

const promisify = (Test) => {
  return new Promise((_res, _rej) => {
    Test.end((err, res) => {
      if (err) {
        _rej(err);
      } else {
        _res(res);
      }
    });
  });
};

const youtubeDummyData = {
  itemId: "eJRvRM9wfdE",
  playlistId: "PLYu-7OugCfta0mrJ5fRKvXfjU3qwgWZxS",
  channelId: "UCtPlB4OmowajcgVaL3jvGcA",
};

const soundcloudDummyData = {
  itemId: "430754811",
  playlistId: "1211028727",
  channelId: "55254934",
};

const password = getRandomCode();
const user = {
  username: "userRouterName",
  email: "youtubeEngine@test",
  password,
  history: [],
  favourites: [],
};
let userWithHashedPassword;
let id;
let request = supertest(app);
const agent = supertest.agent(app);

const loginAgent = async () => {
  const response = await promisify(
    agent
      .post("/login")
      .send({
        email: user.email,
        password: user.password,
      })
      .expect(200)
  );
  const { token } = response.body;

  if (!token) {
    throw new Error("unable to login");
  }

  agent.set("Authorization", "Bearer " + token);
};

beforeAll(async () => {
  try {
    await connect();
    userWithHashedPassword = await hashPasswordIn(user);
    const { insertedId } = await users.save(userWithHashedPassword);
    id = insertedId.toString();
    await loginAgent();
  } catch (e) {
    throw new Error("Unable to connect do db or login the test user.");
  }
});

afterAll(async () => {
  await close();
});

describe("Testing youtube endpoints", () => {
  it("should return search results when given string", (done) => {
    agent
      .post("/api/search/youtube")
      .send({
        searchString: "idkjeffery",
      })
      .expect(200, (err, res) => {
        const suggestions = res.body.searchResultsArray;
        expect(Array.isArray(suggestions)).toBe(true);
        done();
      });
  });

  it("should return array of string suggestions when given string", (done) => {
    agent
      .post("/api/suggestions/youtube")
      .send({
        searchString: "idkjeffery",
      })
      .expect(200, (err, res) => {
        const suggestions = res.body.suggestionsArray;
        expect(Array.isArray(suggestions)).toBe(true);
        expect(suggestions.every((item) => typeof item === "string")).toBe(
          true
        );
        done();
      });
  });

  it("should return direct url when given item id", (done) => {
    agent
      .post("/api/url/youtube")
      .send({
        id: youtubeDummyData.itemId,
      })
      .expect(200, (err, res) => {
        const { directUrl } = res.body;
        expect(typeof directUrl).toBe("string");
        done();
      });
  });

  it("should return playlist items when given playlist Id", (done) => {
    agent
      .post("/api/playlist/youtube")
      .send({
        id: youtubeDummyData.playlistId,
      })
      .expect(200, (err, res) => {
        const { playlistItems } = res.body;
        expect(Array.isArray(playlistItems)).toBe(true);
        done();
      });
  });

  it("should return channel items when given youtube channel Id", (done) => {
    agent
      .post("/api/youtube/channel/items")
      .send({
        channelId: youtubeDummyData.channelId,
      })
      .expect(200, (err, res) => {
        const { searchResultsArray } = res.body;
        expect(Array.isArray(searchResultsArray)).toBe(true);
        done();
      });
  });

  it("should return channel playlists when given channel Id", (done) => {
    agent
      .post("/api/youtube/channel/playlists")
      .send({
        channelId: youtubeDummyData.channelId,
      })
      .expect(200, (err, res) => {
        const { searchResultsArray } = res.body;
        expect(Array.isArray(searchResultsArray)).toBe(true);
        done();
      });
  });
});

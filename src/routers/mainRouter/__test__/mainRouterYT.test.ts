import app from "app";
import { close, connect } from "db";
import { hashPasswordIn } from "models/helpers";
import supertest, { Test } from "supertest";
import { getRandomCode } from "utils";
import dotenv from "dotenv";
import users from "models/user";
import nock from "nock";

dotenv.config();

const promisify = (Test: Test) => {
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
const agent = supertest.agent(app, {});

const loginAgent = async () => {
  const response: any = await promisify(
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
    const insertionResult = await users.save(userWithHashedPassword);
    if (!insertionResult) {
      throw new Error("Unable to save user.");
    }
    id = insertionResult.insertedId.toString();
    await loginAgent();
    nock.back.setMode("record");
    nock.back.fixtures = __dirname + "/nockFixtures";
  } catch (e: any) {
    throw new Error(
      "Unable to connect do db or login the test user.\n" + e.message
    );
  }
});

afterAll(async () => {
  await close();
});

const matcher = (host: string) => {
  return host.includes("127.0.0.1");
};

describe("Testing youtube endpoints", () => {
  it("should return search results when given string", (done) => {
    nock.back("searchResultsYT.json").then(({ nockDone }) => {
      nock.enableNetConnect(matcher);
      agent
        .post("/api/search/youtube")
        .send({
          searchString: "idkjeffery",
        })
        .expect(200, (err, res) => {
          const suggestions = res.body.searchResultsArray;
          expect(Array.isArray(suggestions)).toBe(true);
          done();
          nockDone();
        });
    });
  });

  it("should return array of string suggestions when given string", (done) => {
    nock.back("suggestionsYT.json", (nockDone) => {
      nock.enableNetConnect(matcher);
      agent
        .post("/api/suggestions/youtube")
        .send({
          searchString: "idkjeffery",
        })
        .expect(200, (err, res) => {
          const suggestions = res.body.suggestionsArray as string[];
          expect(Array.isArray(suggestions)).toBe(true);
          expect(suggestions.every((item) => typeof item === "string")).toBe(
            true
          );
          done();
          nockDone();
        });
    });
  });

  it("should return direct url when given item id", (done) => {
    nock.back("directUrlYT.json").then(({ nockDone }) => {
      nock.enableNetConnect(matcher);
      agent
        .post("/api/url/youtube")
        .send({
          id: youtubeDummyData.itemId,
        })
        .expect(200, (err, res) => {
          const { directUrl } = res.body;
          expect(typeof directUrl[0].url).toBe("string");
          done();
          nockDone();
        });
    });
  });

  it("should return playlist items when given playlist Id", (done) => {
    nock.back("playlistItemsYT.json").then(({ nockDone }) => {
      nock.enableNetConnect(matcher);
      agent
        .post("/api/playlist/youtube")
        .send({
          id: youtubeDummyData.playlistId,
        })
        .expect(200, (err, res) => {
          const { playlistItems } = res.body;
          expect(Array.isArray(playlistItems)).toBe(true);
          done();
          nockDone();
        });
    });
  });

  it("should return channel items when given youtube channel Id", (done) => {
    nock.back("channelItemsYT.json").then(({ nockDone }) => {
      nock.enableNetConnect(matcher);
      agent
        .post("/api/youtube/channel/items")
        .send({
          channelId: youtubeDummyData.channelId,
        })
        .expect(200, (err, res) => {
          const { searchResultsArray } = res.body;
          expect(Array.isArray(searchResultsArray)).toBe(true);
          done();
          nockDone();
        });
    });
  });

  it("should return channel playlists when given channel Id", (done) => {
    nock.back("channelPlaylistsYT.json").then(({ nockDone }) => {
      nock.enableNetConnect(matcher);
      agent
        .post("/api/youtube/channel/playlists")
        .send({
          channelId: youtubeDummyData.channelId,
        })
        .expect(200, (err, res) => {
          const { searchResultsArray } = res.body;
          expect(Array.isArray(searchResultsArray)).toBe(true);
          done();
          nockDone();
        });
    });
  });
});

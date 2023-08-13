import dotenv from "dotenv";
import supertest from "supertest";

import app from "app";
import { close, connect } from "db";
import users from "models/user";
import { generateUniqueDummyUser, youtubeDummyData } from "./dummyData";
import nock from "nock";
import { promisify } from "./helpers";

dotenv.config();
const agent = supertest.agent(app, {});

const loginAgent = async (user: UserInfo) => {
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
    const { user, userWithHashedPassword } = await generateUniqueDummyUser(
      "YTtesting"
    );
    const insertionResult = await users.save(userWithHashedPassword);
    if (!insertionResult) {
      throw new Error("Unable to save user.");
    }
    insertionResult.insertedId.toString();
    await loginAgent(user);
    nock.back.setMode("record");
    nock.back.fixtures = __dirname + "/nockFixtures/YT";
  } catch (e: any) {
    throw new Error(
      "Unable to connect do db or login the test user.\n" + e.message
    );
  }
});

afterAll(async () => {
  await close();
});

const isLocalHost = (host: string) => {
  return host.includes("127.0.0.1");
};

describe("Testing youtube endpoints", () => {
  it("should return search results when given string", (done) => {
    nock.back("searchResultsYT.json").then(({ nockDone }) => {
      nock.enableNetConnect(isLocalHost);
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

  it("should return item info when given id", (done) => {
    nock.back("itemInfoYT.json").then(({ nockDone }) => {
      nock.enableNetConnect(isLocalHost);
      agent
        .post("/api/info/youtube")
        .send({
          id: youtubeDummyData.itemId,
        })
        .expect(200, (err, res) => {
          const itemInfo = res.body as Item;
          expect(typeof itemInfo.title === "string").toBe(true);
          done();
          nockDone();
        });
    });
  });

  it("should return array of string suggestions when given string", (done) => {
    nock.back("suggestionsYT.json", (nockDone) => {
      nock.enableNetConnect(isLocalHost);
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
      nock.enableNetConnect(isLocalHost);
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
      nock.enableNetConnect(isLocalHost);
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
      nock.enableNetConnect(isLocalHost);
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
      nock.enableNetConnect(isLocalHost);
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

  it("should successfuly ping", (done) => {
    nock.back("ping.json").then(({ nockDone }) => {
      nock.enableNetConnect(isLocalHost);
      agent.get("/ping/youtube").expect(200, () => {
        done();
        nockDone();
      });
    });
  });
});

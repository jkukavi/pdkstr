import dotenv from "dotenv";
import supertest from "supertest";

import app from "app";
import { close, connect } from "db";
import users from "models/user";
import { generateUniqueDummyUser, soundcloudDummyData } from "./dummyData";
import nock from "nock";
import { promisify } from "./helpers";

dotenv.config();
const agent = supertest.agent(app);

const loginAgent = async (user: UserInfo) => {
  const response: any = await promisify(
    agent
      .post("/login/")
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
      "SCtesting"
    );
    const insertionResult = await users.save(userWithHashedPassword);
    if (!insertionResult) {
      throw new Error("Unable to save user.");
    }
    insertionResult.insertedId.toString();
    await loginAgent(user);
    nock.back.setMode("record");
    nock.back.fixtures = __dirname + "/nockFixtures/SC";
  } catch (e) {
    throw new Error("Unable to connect do db or login the test user.");
  }
});

afterAll(async () => {
  await close();
});

const isLocalHost = (host: string) => {
  return host.includes("127.0.0.1");
};

describe("Testing soundcloud endpoints", () => {
  test("should return results for search", (done) => {
    nock.back("searchResultsSC.json").then(({ nockDone }) => {
      nock.enableNetConnect(isLocalHost);
      agent
        .post("/api/search/soundcloud")
        .send({
          searchString: "idkjeffery",
        })
        .expect(200, (err, res) => {
          expect(Array.isArray(res.body.searchResultsArray)).toBe(true);
          done();
          nockDone();
        });
    });
  });

  test("should return array of string suggestions when given string", (done) => {
    nock.back("suggestionsSC.json").then(({ nockDone }) => {
      nock.enableNetConnect(isLocalHost);
      agent
        .post("/api/suggestions/soundcloud")
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

  test("should return direct url when given item id", (done) => {
    nock.back("directUrlSC.json").then(({ nockDone }) => {
      nock.enableNetConnect(isLocalHost);
      agent
        .post("/api/url/soundcloud")
        .send({
          id: soundcloudDummyData.itemId,
        })
        .expect(200, (err, res) => {
          const { directUrl } = res.body;
          expect(typeof directUrl[0].url).toBe("string");
          done();
          nockDone();
        });
    });
  });

  it("should return item info when given id", (done) => {
    nock.back("itemInfoSC.json").then(({ nockDone }) => {
      nock.enableNetConnect(isLocalHost);
      agent
        .post("/api/info/soundcloud")
        .send({
          id: soundcloudDummyData.itemId,
        })
        .expect(200, (err, res) => {
          const itemInfo = res.body as Item;
          expect(typeof itemInfo.title === "string").toBe(true);
          done();
          nockDone();
        });
    });
  });

  it("should return playlist items when given soundcloud playlist Id", (done) => {
    nock.back("playlistItemsSC.json").then(({ nockDone }) => {
      nock.enableNetConnect(isLocalHost);
      agent
        .post("/api/playlist/soundcloud")
        .send({
          id: soundcloudDummyData.playlistId,
        })
        .expect(200, (err, res) => {
          const { playlistItems } = res.body;
          expect(Array.isArray(playlistItems)).toBe(true);
          done();
          nockDone();
        });
    });
  });

  it("should return channel items when given soundcloud channel Id", (done) => {
    nock.back("channelItemsSC.json").then(({ nockDone }) => {
      nock.enableNetConnect(isLocalHost);
      agent
        .post("/api/soundcloud/channel/items")
        .send({
          channelId: soundcloudDummyData.channelId,
        })
        .expect(200, (err, res) => {
          const { searchResultsArray } = res.body;
          expect(Array.isArray(searchResultsArray)).toBe(true);
          done();
          nockDone();
        });
    });
  });

  it("should return channel playlists when given soundcloud channel Id", (done) => {
    nock.back("channelPlaylistsSC.json").then(({ nockDone }) => {
      nock.enableNetConnect(isLocalHost);
      agent
        .post("/api/soundcloud/channel/playlists")
        .send({
          channelId: soundcloudDummyData.channelId,
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
      agent.get("/ping/soundcloud").expect(200, () => {
        done();
        nockDone();
      });
    });
  });
});

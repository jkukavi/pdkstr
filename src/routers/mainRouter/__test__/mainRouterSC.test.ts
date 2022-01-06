import app from "app";
import { close, connect } from "db";
import dotenv from "dotenv";
import { hashPasswordIn } from "models/helpers";
import supertest, { Test } from "supertest";
import { getRandomCode } from "utils";
import users from "models/user";

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

const soundcloudDummyData = {
  itemId: "430754811",
  playlistId: "1211028727",
  channelId: "55254934",
};

const password = getRandomCode();
const user = {
  username: "userRouterName",
  email: "soundcloud@test",
  password,
  history: [],
  favourites: [],
};
let userWithHashedPassword;
let id;
let request = supertest(app);
const agent = supertest.agent(app);

const loginAgent = async () => {
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
    userWithHashedPassword = await hashPasswordIn(user);
    const insertionResult = await users.save(userWithHashedPassword);
    if (!insertionResult) {
      throw new Error("Unable to save user.");
    }
    id = insertionResult.insertedId.toString();
    await loginAgent();
  } catch (e) {
    throw new Error("Unable to connect do db or login the test user.");
  }
});

afterAll(async () => {
  await close();
});

describe("Testing soundcloud endpoints", () => {
  test("should return results for search", (done) => {
    agent
      .post("/api/search/soundcloud")
      .send({
        searchString: "idkjeffery",
      })
      .expect(200, (err, res) => {
        expect(Array.isArray(res.body.searchResultsArray)).toBe(true);
        done();
      });
  });

  test("should return array of string suggestions when given string", (done) => {
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
      });
  });

  test("should return direct url when given item id", (done) => {
    agent
      .post("/api/url/soundcloud")
      .send({
        id: soundcloudDummyData.itemId,
      })
      .expect(200, (err, res) => {
        const { directUrl } = res.body;
        expect(typeof directUrl[0].url).toBe("string");
        done();
      });
  });

  it("should return playlist items when given soundcloud playlist Id", (done) => {
    agent
      .post("/api/playlist/soundcloud")
      .send({
        id: soundcloudDummyData.playlistId,
      })
      .expect(200, (err, res) => {
        const { playlistItems } = res.body;
        expect(Array.isArray(playlistItems)).toBe(true);
        done();
      });
  });

  it("should return channel items when given soundcloud channel Id", (done) => {
    agent
      .post("/api/soundcloud/channel/items")
      .send({
        channelId: soundcloudDummyData.channelId,
      })
      .expect(200, (err, res) => {
        const { searchResultsArray } = res.body;
        expect(Array.isArray(searchResultsArray)).toBe(true);
        done();
      });
  });

  it("should return channel playlists when given soundcloud channel Id", (done) => {
    agent
      .post("/api/soundcloud/channel/playlists")
      .send({
        channelId: soundcloudDummyData.channelId,
      })
      .expect(200, (err, res) => {
        const { searchResultsArray } = res.body;
        expect(Array.isArray(searchResultsArray)).toBe(true);
        done();
      });
  });
});

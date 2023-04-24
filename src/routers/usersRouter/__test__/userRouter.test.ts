import dotenv from "dotenv";

dotenv.config();
import supertest, { Test } from "supertest";
import app from "app";
import { connect, close } from "db";
import { getRandomCode } from "utils";
import { createDummyUser } from "__test__/createUser";

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

describe("User routes", () => {
  let user: UserInfo;
  const agent = supertest.agent(app);

  beforeAll(async () => {
    await connect();
    const { dummyUser } = await createDummyUser();
    user = dummyUser;

    await loginAgent();
  });

  afterAll(async () => {
    await close();
  });

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

  it("should fetch user data", (done) => {
    agent
      .get("/api/users/me")
      .expect(200)
      .end((err, res) => {
        if (err) {
          throw new Error("Unable to fetch user data");
        } else if (res.statusCode === 200 && res.body.username) {
          done();
        }
      });
  });

  it("should fetch my history", (done) => {
    agent
      .get("/api/users/my/history")
      .expect(200)
      .end((err, res) => {
        if (err) {
          throw new Error("Unable to fetch history");
        } else if (res.statusCode === 200 && Array.isArray(res.body)) {
          done();
        }
      });
  });

  it("should fetch my favourites", (done) => {
    agent
      .get("/api/users/my/favourites")
      .expect(200)
      .end((err, res) => {
        if (err) {
          throw new Error("Unable to fetch favourites");
        } else if (res.statusCode === 200 && Array.isArray(res.body)) {
          done();
        }
      });
  });

  it("should fetch my favourites", (done) => {
    agent
      .get("/api/users/my/favourites")
      .expect(200)
      .end((err, res) => {
        if (err) {
          throw new Error("Unable to fetch favourites");
        } else if (res.statusCode === 200 && Array.isArray(res.body)) {
          done();
        }
      });
  });

  it("should add item to my history", async () => {
    const dummyItem = { bla: getRandomCode() };

    await promisify(
      agent.post("/api/users/my/history/").send({ item: dummyItem })
    );

    agent.get("/api/users/my/history/").end((err, res) => {
      if (err) {
        throw new Error("unable to fetch history");
      } else if (res.statusCode === 200) {
        expect(res.body[0]).toEqual(dummyItem);
      }
    });
  });

  it("should add item to my favourites", async () => {
    const dummyItem = { bla: getRandomCode() };

    await promisify(
      agent.post("/api/users/my/favourites/").send({ item: dummyItem })
    );

    agent.get("/api/users/my/favourites/").end((err, res) => {
      if (err) {
        throw new Error("unable to fetch favourites");
      } else if (res.statusCode === 200) {
        expect(res.body[0]).toEqual(dummyItem);
      }
    });
  });
});

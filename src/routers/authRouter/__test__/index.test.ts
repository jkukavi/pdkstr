import { close, connect } from "db";
import supertest, { Test } from "supertest";
import { getRandomCode } from "utils";
import app from "app";
import { createDummyUser } from "__test__/createUser";

process.env.JWT_SECRET = "žaba";
process.env.SENDGRID_API_KEY = "SG.XXXX";

describe("Auth routes", () => {
  const request = supertest(app);

  let user: UserInfo;

  beforeAll(async () => {
    await connect();
    const { dummyUser } = await createDummyUser();
    user = dummyUser;
    process.env.JWT_SECRET = "žaba";
    process.env.SENDGRID_API_KEY = "SG.XXXX";
  });

  afterAll(async () => {
    await close();
  });

  it("should login with right credentials", (done) => {
    request
      .post("/login")
      .send({
        email: user.email,
        password: user.password,
      })
      .expect(200, done);
  });

  it("should not be able to login with wrong credentials", (done) => {
    request
      .post("/login")
      .send({
        email: user.email,
        password: getRandomCode(),
      })
      .expect(401, done);
  });

  test("should be able to get refresh token after login", (done) => {
    const agent = supertest.agent(app);

    agent
      .post("/login")
      .send({
        email: user.email,
        password: user.password,
      })
      .end(async (err, res) => {
        if (res.statusCode !== 200) {
          throw new Error("Unable to login");
        } else {
          const response = await agent.get("/rt/");
          if (response.statusCode !== 200) {
            throw new Error("Unable to login");
          }
          if (response.body.token) {
            done();
          } else {
            throw new Error("no refresh TOken received");
          }
        }
      });
  });

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

  it("should be able to refresh token only when logged in", async () => {
    const agent = supertest.agent(app);

    await promisify(agent.get("/rt/").expect(401));

    await promisify(
      agent
        .post("/login/")
        .send({
          email: user.email,
          password: user.password,
        })
        .expect(200)
    );

    await promisify(agent.get("/rt/").expect(200));

    await promisify(agent.get("/logout/").expect(200));

    await agent.get("/rt/").expect(401);
  });
});

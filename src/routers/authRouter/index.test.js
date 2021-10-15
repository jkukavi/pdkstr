process.env.JWT_SECRET = "žaba";
process.env.SENDGRID_API_KEY = "SG.XXXX";

const supertest = require("supertest");
const users = require("../../models/user");
const app = require("../../app");
const { connect, close } = require("../../db");
const { getRandomCode } = require("../../utils");
const { hashPasswordIn } = require("../../models/helpers");

describe("Auth routes", () => {
  const password = getRandomCode();
  const user = {
    email: "authRouter@test",
    password,
    history: [],
    favourites: [],
  };
  let userWithHashedPassword;
  let id;
  let request = supertest(app);

  beforeAll(async () => {
    await connect();
    userWithHashedPassword = await hashPasswordIn(user);
    const { insertedId } = await users.save(userWithHashedPassword);
    id = insertedId.toString();
    process.env.JWT_SECRET = "žaba";
    process.env.SENDGRID_API_KEY = "SG.XXXX";
  });

  afterAll(async () => {
    await close();
  });

  it("should login with right credentials", async (done) => {
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
          const response = await agent.get("/rt");
          if (response.statusCode !== 200) {
            throw new Error("Unable to login");
          }
          if (!!response.body.token) {
            done();
          } else {
            throw new Error("no refresh TOken received");
          }
        }
      });
  });

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

  it("should be able to refresh token only when logged in", async (done) => {
    const agent = supertest.agent(app);

    await promisify(agent.get("/rt").expect(401));

    await promisify(
      agent
        .post("/login")
        .send({
          email: user.email,
          password: user.password,
        })
        .expect(200)
    );

    await promisify(
      agent
        .post("/rt")
        .send({
          email: user.email,
          password: user.password,
        })
        .expect(200)
    );

    await promisify(agent.get("/logout").expect(200));

    agent.get("/rt").expect(401, done);
  });
});
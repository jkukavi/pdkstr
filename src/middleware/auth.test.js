const jwt = require("jsonwebtoken");
const { getRandomCode } = require("../utils");
const { auth } = require("./auth");

describe("auth middleware test", () => {
  beforeAll(() => {
    process.env.JWT_SECRET = getRandomCode();
  });

  test("auth should be successful with valid token", (done) => {
    const userId = getRandomCode();
    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET);
    const req = { headers: { authorization: null } };
    req.headers.authorization = "Bearer " + token;
    let responseStatus;
    const res = {
      status: (newStatus) => {
        if (newStatus === 401) {
          throw new Error("Unable to auth with valid token");
        }
      },
    };
    const next = () => {
      if (req.userId === userId) {
        done();
      } else if (responseStatus === 401) {
        throw new Error("Unable to auth with valid token");
      }
    };
    auth(req, res, next);
  });

  test("auth should be unsuccessful with invalid token", (done) => {
    const userId = getRandomCode();
    let token = jwt.sign({ id: userId }, process.env.JWT_SECRET);
    token[5] = "s";
    const req = { headers: { authorization: null } };
    req.headers.authorization = "Bearer " + token;
    let responseStatus;
    const res = {
      status: (newStatus) => {
        if (newStatus === 401) {
          return {
            send: () => {
              done();
            },
          };
        }
      },
    };
    const next = () => {
      if (req.userId === userId) {
        throw new Error("authing with invalid token should not be successful");
      } else if (responseStatus === 401) {
        done();
      }
    };
    auth(req, res, next);
  });
});

// const auth = async (req, res, next) => {
//   try {
//     const token = req.headers.authorization.replace("Bearer ", "");
//     const payload = jwt.verify(token, process.env.JWT_SECRET);
//     req.userId = payload.id;
//     next();
//   } catch (e) {
//     res.status(401).send({ error: "Please authenticate." });
//   }
// };

// const proxyAuth = (req, res, next) => {
//   const audioCookie = req.cookies.ac;

//   if (audioCookie === process.env.AUDIO_COOKIE) {
//     next();
//   } else {
//     res.status(401).send({ error: "You need to authenticate." });
//   }
// };

// module.exports = { auth, proxyAuth };

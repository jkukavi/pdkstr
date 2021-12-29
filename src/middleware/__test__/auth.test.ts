import { Response } from "express";
import jwt from "jsonwebtoken";
import { getRandomCode } from "utils";
import { auth } from "../auth";

describe("auth middleware test", () => {
  beforeAll(() => {
    process.env.JWT_SECRET = getRandomCode();
  });

  test("auth should be successful with valid token", (done) => {
    const userId = getRandomCode();
    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET as string);
    const req: any = { headers: { authorization: null } };
    req.headers.authorization = "Bearer " + token;
    let responseStatus: number;
    const res = {
      status: (newStatus) => {
        if (newStatus === 401) {
          throw new Error("Unable to auth with valid token");
        }
      },
      locals: {},
    } as Response<any, { userId: string }>;
    const next = () => {
      if (res.locals.userId === userId) {
        done();
      } else if (responseStatus === 401) {
        throw new Error("Unable to auth with valid token");
      }
    };
    auth(req, res, next);
  });

  test("auth should be unsuccessful with invalid token", (done) => {
    const userId = getRandomCode();
    let token = jwt.sign({ id: userId }, process.env.JWT_SECRET as string);
    const req: any = { headers: { authorization: null } };
    req.headers.authorization = "Bearer " + token + "a";
    let responseStatus: number;
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
      locals: {},
    } as Response<any, { userId: string }>;
    const next = () => {
      if (res.locals.userId === userId) {
        throw new Error("authing with invalid token should not be successful");
      } else if (responseStatus === 401) {
        done();
      }
    };
    auth(req, res, next);
  });
});

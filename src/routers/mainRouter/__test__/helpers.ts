import { Test } from "supertest";

export const promisify = (Test: Test) => {
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

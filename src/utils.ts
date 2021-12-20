import crypto from "crypto";

const getRandomCode = () => {
  return crypto.randomBytes(25).toString("hex");
};

export { getRandomCode };
import crypto from "crypto";

const getRandomCode = (): string => {
  return crypto.randomBytes(25).toString("hex");
};

export { getRandomCode };

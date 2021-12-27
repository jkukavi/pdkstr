import crypto from "crypto";

const getRandomCode = (): string => {
  return crypto.randomBytes(25).toString("hex");
};

const urlToHttpOptions = (stringUrl: string) => {
  const { protocol, hostname, pathname, search } = new URL(stringUrl);
  return { protocol, hostname, path: pathname + search };
};

const getDomainFromUrlString = (url: string): string => {
  const { hostname } = new URL(url);
  return hostname.split(".")[1];
};

export { getRandomCode, urlToHttpOptions, getDomainFromUrlString };

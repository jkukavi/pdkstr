import { CookieOptions } from "express";

export const CSPPolicies = {
  directives: {
    defaultSrc: ["'self'"],
    scriptSrc: ["'self'", "example.com"],
    imgSrc: [
      "'self'",
      "i.ytimg.com",
      "yt3.ggpht.com",
      "yt3.googleusercontent.com",
      "hips.hearstapps.com",
      "i1.sndcdn.com",
    ],
    "media-src": [
      "'self'",
      "*.googlevideo.com",
      "*.sndcdn.com",
      "*.backblazeb2.com",
    ],
    "font-src": ["fonts.googleapis.com", "fonts.gstatic.com"],
    "style-src-elem": ["'self'", "fonts.googleapis.com", "fonts.gstatic.com"],
  },
};

export const refreshCookieOptions: CookieOptions = {
  httpOnly: true, // The cookie only accessible by the web server
  path: "/rt",
  sameSite: "strict",
  maxAge: 24 * 60 * 60 * 1000,
};
export const audioCookieOptions: CookieOptions = {
  httpOnly: true, // The cookie only accessible by the web server
  path: "/proxy",
  sameSite: "strict",
  maxAge: 24 * 60 * 60 * 1000,
};

export const expiredCookieOptions: CookieOptions = {
  maxAge: 0,
  expires: new Date(0),
};

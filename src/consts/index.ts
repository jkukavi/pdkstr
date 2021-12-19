export const CSPPolicies = {
  directives: {
    defaultSrc: ["'self'"],
    scriptSrc: ["'self'", "example.com"],
    imgSrc: [
      "'self'",
      "i.ytimg.com",
      "yt3.ggpht.com",
      "hips.hearstapps.com",
      "i1.sndcdn.com",
    ],
    "media-src": ["'self'", "*.googlevideo.com", "*.sndcdn.com"],
    "font-src": ["fonts.googleapis.com", "fonts.gstatic.com"],
    "style-src-elem": ["'self'", "fonts.googleapis.com", "fonts.gstatic.com"],
  },
};

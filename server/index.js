const express = require("express");
const app = express();
const helmet = require("helmet");

const auth = require("./auth");
const mainRouter = require("./mainRouter");

app.use(
  helmet.contentSecurityPolicy({
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
  })
);

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

// Client is served with:
app.use(express.static("client/build"));
// Backend is routed with:
app.use(auth, mainRouter);

console.log("server started 8080");

module.exports = app;

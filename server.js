const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const helmet = require("helmet");
const { getDirectUrl, searchYoutube } = require("./ytFunctions.js");

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "example.com"],
      "img-src": [
        "'self'",
        "i.ytimg.com",
        "yt3.ggpht.com",
        "hips.hearstapps.com",
      ],
    },
  })
);
//proba
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// Serve the static files from the React app

app.use(express.static("client/build"));

app.post("/url", async (req, res) => {
  console.log("hit");
  const url = req.body.url;
  var directUrl = await getDirectUrl(url);
  if (directUrl) {
    res.status(200).json({ directUrl });
  } else {
    res.status(400).json({ message: "Direct url not found" });
  }
});

app.post("/search", async (req, res) => {
  console.log("hitsearch");
  const { searchString } = req.body;
  var searchResultsArray = await searchYoutube(searchString);
  if (searchResultsArray) {
    res.status(200).json({ searchResultsArray });
  } else {
    res.status(400).json({ message: "No results" });
  }
});

console.log("server started 8080");
app.listen(process.env.PORT || 8080);

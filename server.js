const express = require("express");
var bodyParser = require("body-parser");

const app = express();
const helmet = require("helmet");
const { getDirectUrl, searchYoutube } = require("./ytFunctions.js");

const dir = `${__dirname}/public/`;

//proba
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(helmet());

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

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

console.log("server started 8080");
app.listen(process.env.PORT || 8080);

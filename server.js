const express = require("express");
var bodyParser = require("body-parser");

const app = express();
const helmet = require("helmet");
const getDirectUrl = require("./yt.js");

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
  const url = req.body.url;
  var directUrl = await getDirectUrl(url);
  if (directUrl) {
    res.status(200).json({ directUrl });
  } else {
    res.status(400).json({ message: "Direct url not found" });
  }
});

console.log("server started 8080");
app.listen(process.env.PORT || 8080);

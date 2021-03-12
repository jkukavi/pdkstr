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
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index", { message: 0, url: 0 });
});

app.post("/", async (req, res) => {
  var url = await getDirectUrl(req.body.url);
  if (url) {
    res.render("index", { message: 0, url });
  } else {
    res.render("index", { message: "Url Not Found.", url: 0 });
  }
});

console.log("server started 8080");
app.listen(process.env.PORT || 8080);

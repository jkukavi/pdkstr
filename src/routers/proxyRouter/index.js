const express = require("express");
const { https } = require("follow-redirects");

const router = express.Router();

router.get("/:url", (req, res) => {
  const { url } = req.params;
  if (req.headers.range && domain(url) === "googlevideo") {
    https.get(url, { headers: { range: req.headers.range } }, (res2) => {
      res.writeHead(res2.statusCode, res2.statusMessage, res2.headers);
      res2.pipe(res);
    });
  } else {
    res.end();
  }
});

const domain = (url) => {
  const { hostname } = new URL(url);
  return hostname.split(".")[1];
};

module.exports = router;

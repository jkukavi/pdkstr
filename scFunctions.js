const scSearcher = new (require("./scSearch.js"))();
const https = require("https");
const fs = require("fs");
const { stdout } = require("process");

const query = "idontknowjeffery";
const result_limit = 10;

//sc-searcher
// scSearcher.getTracks(query, result_limit).then((res) => {
//   var bla = 2;
// });

const bla = async () => {
  var playlist = await scSearcher.getUserTracks("55254934", 10);
  var searchedTracks = await scSearcher.getTracks("plash riot", 10);

  fs.writeFileSync("file.JSON", JSON.stringify(searchedTracks, null, 2));
};

bla();

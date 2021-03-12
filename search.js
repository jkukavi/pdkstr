const ytsr = require("ytsr");
const fs = require("fs");

const search = async (searchString) => {
  const searchResults = await ytsr(searchString, { limit: 20 });
  fs.writeFileSync("bla.json", JSON.stringify(searchResults.items, null, 2));
  console.log("success");
};

search("grant cardone interview");

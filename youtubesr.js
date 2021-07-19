const YouTube = require("youtube-sr").default;
const fs = require("fs");

async function search() {
  const item = await YouTube.getSuggestions("tai lopet int");
  console.log(item);
}

search();

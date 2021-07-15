const YouTube = require("youtube-sr").default;
const fs = require("fs");

async function search() {
  const item = await YouTube.getVideo(
    "https://www.youtube.com/watch?v=zYl4H_EbepU"
  );
  fs.writeFileSync("sr.json", JSON.stringify(item, null, 2));
}

search();

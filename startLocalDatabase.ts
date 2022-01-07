import { MongoMemoryServer } from "mongodb-memory-server";

import { MongoClient } from "mongodb";

const startLocalDatabase = async () => {
  const mongod = new MongoMemoryServer({
    instance: {
      port: 27017, // by default choose any free port
      ip: "0.0.0.0",
      dbName: "podkaster", // by default '' (empty string),
      storageEngine: "wiredTiger",
    },
    binary: {
      downloadDir: "./node_modules/mongodb-memory-server/",
      version: "5.0.3",
    },
  } as any);

  await mongod.start();

  const mongodUri = mongod.getUri();

  const connection = await MongoClient.connect("mongodb://localhost:27017");

  await connection
    .db("podkaster")
    .collection("users")
    .insertOne({
      username: "dasd",
      password: "$2b$14$65x0f6FC/RCVhLU6.XAZAuIhMtRIQcnov6Q/Bpx1GvU9C.rqB.29q",
      email: "mikivela1111@gmail.com",
      favourites: [],
      history: [
        {
          type: "video",
          title: "HIT ME FIRST - idontknowjeffery ( OFFICIAL VIDEO )",
          id: "IV0arm42PMM",
          url: "https://www.youtube.com/watch?v=IV0arm42PMM",
          bestThumbnail: {
            url: "https://i.ytimg.com/vi/IV0arm42PMM/hq720.jpg?sqp=-oaymwEXCNAFEJQDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLAzhZKDWeo2rHE1ZAGWo3pX4gSOQw",
            width: 720,
            height: 404,
          },
          thumbnails: [
            {
              url: "https://i.ytimg.com/vi/IV0arm42PMM/hq720.jpg?sqp=-oaymwEXCNAFEJQDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLAzhZKDWeo2rHE1ZAGWo3pX4gSOQw",
              width: 720,
              height: 404,
            },
            {
              url: "https://i.ytimg.com/vi/IV0arm42PMM/hq720.jpg?sqp=-oaymwEjCOgCEMoBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLB6StR_n3yh8MZHem6Eod9QjdeErg",
              width: 360,
              height: 202,
            },
          ],
          isUpcoming: false,
          upcoming: null,
          isLive: false,
          badges: ["4K"],
          author: {
            name: "IDONTKNOWJEFFERY",
            channelID: "UCtPlB4OmowajcgVaL3jvGcA",
            url: "https://www.youtube.com/channel/UCtPlB4OmowajcgVaL3jvGcA",
            bestAvatar: {
              url: "https://yt3.ggpht.com/ytc/AKedOLQr0-cF8WJKsegv_DZdfHvcU4YGSrXRi2OCqHyPbg=s88-c-k-c0x00ffffff-no-rj",
              width: 68,
              height: 68,
            },
            avatars: [
              {
                url: "https://yt3.ggpht.com/ytc/AKedOLQr0-cF8WJKsegv_DZdfHvcU4YGSrXRi2OCqHyPbg=s88-c-k-c0x00ffffff-no-rj",
                width: 68,
                height: 68,
              },
            ],
            ownerBadges: ["Official Artist Channel"],
            verified: true,
            type: "channel",
          },
          description: null,
          views: 545154,
          duration: "2:36",
          uploadedAt: "3 years ago",
          engine: "youtube",
          key: "632a192e-4c69-4881-b9de-eb4f0684bc70",
        },
      ],
    });

  await connection.close();
};

startLocalDatabase();

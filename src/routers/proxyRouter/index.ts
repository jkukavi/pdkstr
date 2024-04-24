import express, { Request, Response } from "express";

import { https } from "follow-redirects";
import ffmpeg from "fluent-ffmpeg";
import { urlToHttpOptions, getDomainFromUrlString } from "utils";
import engines from "routers/mainRouter/searchEngines";
import ytdl from "ytdl-core";

const router = express.Router();

router.get("/dl/cached/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // Create the stream from YouTube
    const info = await ytdl.getInfo(id);
    const format = ytdl.chooseFormat(info.formats, { quality: "lowestaudio" });

    if (format && format.contentLength) {
      res.setHeader("Content-Length", format.contentLength);
    } else {
      // If content length is not available, you might want to consider other options
      console.log("Content length not available.");
    }

    // Set headers to inform the client about the type of content
    res.setHeader("Content-Type", "audio/mpeg"); // Adjust according to the actual content type
    res.setHeader("Content-Disposition", "inline;"); // This allows playing without downloading

    const stream = ytdl.downloadFromInfo(info, { quality: "lowestaudio" });
    stream.pipe(res);

    // Handle stream events
    stream.on("error", (err) => {
      console.error("Stream error:", err);
      res.status(404).send("Video not found or error streaming the video");
    });
  } catch (error) {
    console.error("Error fetching video info:", error);
    res.status(500).send("Failed to fetch video information");
  }

  // It's not necessary to manually send a response because piping handles this process
});

router.get("/:url", (req: Request, res: Response) => {
  const { url: encodedUrl } = req.params;
  const url = decodeURIComponent(encodedUrl);
  const httpsOptions = urlToHttpOptions(url);
  const urlMeetsProxyCriteria =
    req.headers.range && getDomainFromUrlString(url) === "googlevideo";

  if (true) {
    https
      .get(
        {
          ...httpsOptions,
        },
        (proxiedRes) => {
          res.writeHead(
            proxiedRes.statusCode || 200,
            proxiedRes.statusMessage,
            proxiedRes.headers
          );
          proxiedRes.pipe(res);
        }
      )
      .on("error", () => {
        res.end();
      });
  } else {
    res.status(400).end();
  }
});

router.get<string, { engine: Engine; id: string }, null>(
  "/dl/:engine/:id",
  async (req, res) => {
    const { engine, id } = req.params;

    const { getDirectUrls, getItemInfo } = engines[engine];

    try {
      const itemInfo = await getItemInfo(id);
      const urls = await getDirectUrls(id);

      const itemName = `${itemInfo?.author?.name} - ${itemInfo.title}`;

      console.log(itemName);

      const urlInfo = urls[0];

      https
        .get(
          {
            ...urlToHttpOptions(urlInfo.url),
            headers: {
              Range: "bytes=0-",
            },
          },
          (resp) => {
            res.setHeader(
              "Content-disposition",
              `attachment; filename="${itemName}"`
            );
            res.setHeader("Content-type", "audio/mp3");

            ffmpeg().input(resp).outputFormat("mp3").pipe(res);
          }
        )
        .on("error", () => {
          res.status(400).json();
        });
    } catch (e: any) {
      res.status(400).json();
    }
  }
);

export default router;

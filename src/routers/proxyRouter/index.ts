import express, { Request, Response } from "express";

import { https } from "follow-redirects";
import ffmpeg from "fluent-ffmpeg";
import { urlToHttpOptions, getDomainFromUrlString } from "utils";
import engines from "routers/mainRouter/searchEngines";

const router = express.Router();

router.get("/:url", (req: Request, res: Response) => {
  const { url: encodedUrl } = req.params;
  const url = decodeURIComponent(encodedUrl);
  const httpsOptions = urlToHttpOptions(url);
  const urlMeetsProxyCriteria =
    req.headers.range && getDomainFromUrlString(url) === "googlevideo";

  if (urlMeetsProxyCriteria) {
    https
      .get(
        {
          ...httpsOptions,
          headers: { range: req.headers.range },
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
      .on("error", (e) => {
        console.log(e);
        res.end();
      });
  } else {
    res.status(400).end();
  }
});

router.get<string, { engine: Engine; id: string }, {}>(
  "/dl/:engine/:id",
  async (req, res) => {
    const { engine, id } = req.params;

    const { getDirectUrls } = engines[engine];

    try {
      const urls = await getDirectUrls(id);

      const urlInfo = urls[0];

      https
        .get(urlToHttpOptions(urlInfo.url), (resp) => {
          res.setHeader(
            "Content-disposition",
            `attachment; filename="song.mp3"`
          );
          res.setHeader("Content-type", "audio/mp3");

          ffmpeg().input(resp).outputFormat("mp3").pipe(res);
        })
        .on("error", () => {
          res.status(400).json("There was an error while downloading.");
        });
    } catch (e: any) {
      res.status(400).json("Unable to locate file on remote server.");
    }
  }
);

export default router;

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
      .on("error", () => {
        res.end();
      });
  } else {
    res.status(400).end();
  }
});

const sanitizeHeaderContent = (input: string) =>
  input.replace(/[\0\n\r\v\f]/g, "_");

router.get<string, { engine: Engine; id: string }, null>(
  "/dl/:engine/:id",
  async (req, res) => {
    const { engine, id } = req.params;

    const { getDirectUrls, getItemInfo } = engines[engine];

    try {
      const itemInfo = await getItemInfo(id);
      const urls = await getDirectUrls(id);

      const itemNameUnsanitized = `${itemInfo?.author?.name} - ${itemInfo.title}`;

      const itemName = sanitizeHeaderContent(itemNameUnsanitized);

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

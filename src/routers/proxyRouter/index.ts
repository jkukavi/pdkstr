import express, { Request, Response } from "express";
import { https } from "follow-redirects";

import { urlToHttpOptions, getDomainFromUrlString } from "utils";

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

export default router;

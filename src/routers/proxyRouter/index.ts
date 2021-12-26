import express, { Request, Response } from "express";

import { https } from "follow-redirects";

const urlToHttpOptions = (stringUrl: string) => {
  const { protocol, hostname, pathname, search } = new URL(stringUrl);

  return { protocol, hostname, path: pathname + search };
};

const router = express.Router();

router.get("/:url", (req: Request, res: Response) => {
  const { url: encodedUrl } = req.params;
  const url = decodeURIComponent(encodedUrl);
  const httpsOptions = urlToHttpOptions(url);
  if (req.headers.range && getDomainFromUrl(url) === "googlevideo") {
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
          console.log("proxied YALL");
          proxiedRes.pipe(res);
        }
      )
      .on("error", (e) => {
        console.log(e);
        res.end();
      });
  } else {
    res.end();
  }
});

const getDomainFromUrl = (url: string): string => {
  const { hostname } = new URL(url);
  return hostname.split(".")[1];
};

export default router;

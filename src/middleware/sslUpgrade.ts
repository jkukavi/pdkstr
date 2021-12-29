import { NextFunction, Request, Response } from "express";

const upgradeToSSLIfNecessary = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.header("x-forwarded-proto") !== "https") {
    res.redirect(`https://${req.header("host")}${req.url}`);
  } else next();
};

export { upgradeToSSLIfNecessary };

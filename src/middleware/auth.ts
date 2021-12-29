import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

const auth = async (
  req: Request,
  res: Response<any, { userId: string }>,
  next: NextFunction
) => {
  try {
    if (req.headers.authorization) {
      const token = req.headers.authorization.replace("Bearer ", "");
      const payload = jwt.verify(
        token,
        process.env.JWT_SECRET as string
      ) as JwtPayload;
      res.locals.userId = payload.id;
      next();
    }
  } catch (e) {
    res.status(401).send({ error: "Please authenticate." });
  }
};

const proxyAuth = (req: Request, res: Response, next: NextFunction) => {
  const audioCookie = req.cookies.ac;

  if (audioCookie === process.env.AUDIO_JWT_SECRET) {
    next();
  } else {
    res.status(401).send({ error: "You need to authenticate." });
  }
};

export { auth, proxyAuth };

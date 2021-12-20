import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.replace("Bearer ", "");
    const payload: any = jwt.verify(token, process.env.JWT_SECRET as string);
    req.userId = payload.id;
    next();
  } catch (e) {
    res.status(401).send({ error: "Please authenticate." });
  }
};

const proxyAuth = (req, res, next) => {
  const audioCookie = req.cookies.ac;

  if (audioCookie === process.env.AUDIO_JWT_SECRET) {
    next();
  } else {
    res.status(401).send({ error: "You need to authenticate." });
  }
};

export { auth, proxyAuth };
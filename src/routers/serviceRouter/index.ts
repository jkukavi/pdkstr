import express from "express";
import Heroku from "heroku-client";

const herokuClient = new Heroku({ token: process.env.HTOKEN });
const router = express.Router();

router.post<string, {}>("/restart", async (req, res) => {
  try {
    await herokuClient.delete("/apps/podkaster/dynos/");
    res.status(200).send();
  } catch (e) {
    res.status(400).send();
  }
});

export default router;

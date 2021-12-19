const express = require("express");
const router = express.Router();
const users = require("models/user");

router.get("/me", async (req, res) => {
  try {
    const id = req.userId;
    const { username } = await users.findById(id);
    res.json({ username });
  } catch (e) {
    res.status(404).send();
  }
});

router.get("/my/history", async (req, res) => {
  try {
    const id = req.userId;
    const history = await users.getMyHistory(id);
    res.json(history);
  } catch (e) {
    res.status(404).send();
  }
});

router.get("/my/favourites", async (req, res) => {
  try {
    const id = req.userId;
    const favourites = await users.getMyFavourites(id);
    res.json(favourites);
  } catch (e) {
    res.status(404).send();
  }
});

router.post("/my/history", async (req, res) => {
  try {
    const { item } = req.body;
    const id = req.userId;
    await users.addItemToHistory(id, item);
    res.json({ item });
  } catch (e) {
    res.status(404).send();
  }
});

router.post("/my/favourites", async (req, res) => {
  try {
    const { item } = req.body;
    const id = req.userId;
    await users.addItemToFavourites(id, item);
    res.json({ item });
  } catch (e) {
    res.status(404).send();
  }
});

export default router;

import express, { Request, Response } from "express";
import users from "models/user";

const router = express.Router();

router.get(
  "/me",
  async (req: Request, res: Response<any, { userId: string }>) => {
    try {
      const id = res.locals.userId;
      const user = await users.findById(id);
      if (!user) {
        throw new Error("Cannot find user account.");
      }
      res.json({ username: user.username });
    } catch (e) {
      res.status(404).send();
    }
  }
);

router.get<any, { type: string }, any, any, { search: string; page: number }>(
  "/my/history/:type",
  async (req, res) => {
    try {
      const id = res.locals.userId;
      const type = req.params.type;
      const search = req.query.search || "";
      const page = Number(req.query.page) || 0;
      const history = await users.getMyHistory(id, type, search, page);
      res.json(history);
    } catch (e) {
      res.status(404).send();
    }
  }
);

router.get<any, { type: string }, any, any, { search: string; page: number }>(
  "/my/favourites/:type",
  async (req, res) => {
    try {
      const id = res.locals.userId;
      const type = req.params.type;
      const search = req.query.search || "";
      const page = Number(req.query.page) || 0;
      const favourites = await users.getMyFavourites(id, type, search, page);
      res.json(favourites);
    } catch (e) {
      res.status(404).send();
    }
  }
);

router.post(
  "/my/history",
  async (req: Request, res: Response<any, { userId: string }>) => {
    try {
      const { item } = req.body;
      const id = res.locals.userId;
      await users.addItemToHistory(id, item);
      res.json({ item });
    } catch (e) {
      res.status(404).send();
    }
  }
);

router.post(
  "/my/favourites",
  async (req: Request, res: Response<any, { userId: string }>) => {
    try {
      const { item } = req.body;
      const id = res.locals.userId;
      await users.addItemToFavourites(id, item);
      res.json({ item });
    } catch (e) {
      res.status(404).send();
    }
  }
);

export default router;

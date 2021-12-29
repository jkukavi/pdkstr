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

router.get(
  "/my/history",
  async (req: Request, res: Response<any, { userId: string }>) => {
    try {
      const id = res.locals.userId;
      const history = await users.getMyHistory(id);
      res.json(history);
    } catch (e) {
      res.status(404).send();
    }
  }
);

router.get(
  "/my/favourites",
  async (req: Request, res: Response<any, { userId: string }>) => {
    try {
      const id = res.locals.userId;
      const favourites: any[] = await users.getMyFavourites(id);
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

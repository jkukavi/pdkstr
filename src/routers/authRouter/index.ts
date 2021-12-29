import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import pendingAccounts from "models/pendingAccount";
import users from "models/user";
import { sendActivationEmail } from "./mail";
import { getRandomCode } from "utils";

import {
  audioCookieOptions,
  expiredCookieOptions,
  refreshCookieOptions,
} from "consts";

const router = express.Router();

router.get("/logout", async (req: Request, res: Response) => {
  res.cookie("rt", "invalid", {
    ...refreshCookieOptions,
    ...expiredCookieOptions,
  });

  res.cookie("ac", "invalid", {
    ...audioCookieOptions,
    ...expiredCookieOptions,
  });

  res.status(200).send();
});

router.post(
  "/login",
  async (
    req: Request<{}, any, { email: string; password: string }>,
    res: Response
  ) => {
    const { email, password } = req.body;

    try {
      const user = await users.findByCredentials({ email, password });

      if (!user) {
        throw new Error("Login unsuccessful.");
      }

      const id = user._id.toString();
      const token = jwt.sign({ id }, process.env.JWT_SECRET as string, {
        expiresIn: "15m",
      });

      const refreshToken = jwt.sign({ id }, process.env.JWT_SECRET as string);

      res.cookie("rt", refreshToken, refreshCookieOptions);
      res.cookie("ac", process.env.AUDIO_JWT_SECRET, audioCookieOptions);

      res.status(200).json({ username: user.username, token });
    } catch (e) {
      res.status(401).send();
    }
  }
);

router.get("/rt", async (req: Request, res: Response) => {
  try {
    const refreshToken = req.cookies.rt as string;

    const { id } = jwt.verify(
      refreshToken,
      process.env.JWT_SECRET as string
    ) as {
      id: string;
    };

    const token = jwt.sign({ id }, process.env.JWT_SECRET as string, {
      expiresIn: "15m",
    });

    res.json({ token });
  } catch {
    res.status(401).send();
  }
});

router.post(
  "/register",
  async (req: Request<{}, any, UserInfo>, res: Response) => {
    const user = req.body;
    const activationCode = getRandomCode();
    try {
      const insertionResult = await pendingAccounts.save({
        accountInfo: user,
        activationCode,
      });
      if (!insertionResult) {
        throw new Error("Unable to register at this time.");
      }
      const pendingAccountId = insertionResult.insertedId.toString();
      await sendActivationEmail({
        to: user.email,
        pendingAccountId,
        activationCode,
      });
      res.status(201).send();
    } catch (e) {
      res.status(400).send();
    }
  }
);

router.get(
  "/activate/:pendingAccountId/:activationCode",
  async (req: Request, res: Response) => {
    const { pendingAccountId, activationCode } = req.params;

    try {
      const pendingAccount = await pendingAccounts.findOne({
        id: pendingAccountId,
        activationCode,
      });
      if (!pendingAccount) {
        throw new Error(
          "Unable to find the account you're trying to activate."
        );
      }

      await pendingAccounts.removeById(pendingAccountId);
      await users.save(pendingAccount.accountInfo);

      res.redirect("/activation-success");
    } catch (e) {
      res.status(400).send("Invalid account activation link.");
    }
  }
);

export default router;

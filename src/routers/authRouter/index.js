const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const pendingAccounts = require("../../models/pendingAccount");
const users = require("../../models/user");
const { ObjectId } = require("mongodb");
const { sendActivationEmail, getRandomCode } = require("./mail.js");

router.get("/logout", async (req, res) => {
  let options = {
    httpOnly: true, // The cookie only accessible by the web server
    path: "/rt",
    sameSite: "strict",
    maxAge: 0,
    expires: new Date(0),
    // signed,
  };
  res.cookie("rt", "invalid", options); // options is optional

  res.status(200).send();
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await users.findByCredentials({ email, password });

    const id = user._id.toString();
    const token = jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: "15m",
    });

    const refreshToken = jwt.sign({ id }, process.env.JWT_SECRET);

    //adding refresh token
    let options = {
      httpOnly: true, // The cookie only accessible by the web server
      path: "/rt",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    };
    res.cookie("rt", refreshToken, options); // options is optional

    let audioCookieOptions = {
      httpOnly: true, // The cookie only accessible by the web server
      path: "/proxy",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    };

    res.cookie("ac", process.env.AUDIO_COOKIE, audioCookieOptions);

    res.status(200).json({ username: user.username, token });
  } catch (e) {
    res.status(401).send();
  }
});

router.get("/rt", async (req, res) => {
  try {
    const refreshToken = req.cookies.rt;
    const { id } = jwt.verify(refreshToken, process.env.JWT_SECRET);
    const token = jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: "15m",
    });
    res.json({ token });
  } catch {
    res.status(401).send();
  }
});

router.post("/register", async (req, res) => {
  const user = req.body;
  const activationCode = getRandomCode();
  try {
    const pendingAccount = await pendingAccounts.save({
      accountInfo: user,
      activationCode,
    });
    const pendingAccountId = pendingAccount.insertedId.toString();
    await sendActivationEmail({
      to: user.email,
      pendingAccountId,
      activationCode,
    });
    res.status(201).send();
  } catch (e) {
    res.status(400).send();
  }
});

router.get("/activate/:pendingAccountId/:activationCode", async (req, res) => {
  const { pendingAccountId, activationCode } = req.params;

  try {
    const pendingAccount = await pendingAccounts.findOne({
      _id: ObjectId(pendingAccountId),
      activationCode,
    });

    if (!pendingAccount) {
      throw new Error("Pending account not found.");
    }

    await pendingAccounts.remove(pendingAccount);
    await users.save(pendingAccount.accountInfo);

    res.redirect("/activation-success");
  } catch (e) {
    res.status(400).send("Invalid account activation link.");
  }
});

module.exports = router;

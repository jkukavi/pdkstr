import express from "express";
import cookieParser from "cookie-parser";
import path from "path";
import helmet from "helmet";
import { CSPPolicies } from "./consts";

import { auth, proxyAuth } from "./middleware/auth";

import authRouter from "./routers/authRouter";
import { upgradeToSSLIfNecessary } from "./middleware/sslUpgrade";

import mainRouter from "./routers/mainRouter";
import usersRouter from "./routers/usersRouter";
import proxyRouter from "./routers/proxyRouter";
import serviceRouter from "./routers/serviceRouter";

const app = express();

app.use(helmet.contentSecurityPolicy(CSPPolicies));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cookieParser());

//redirect user to https if accidentaly visits http
if (process.env.NODE_ENV === "production") {
  app.use(upgradeToSSLIfNecessary);
}

// Clients static files are served with:
app.use("/", express.static("client/build"));

// Backend is routed with:
app.use(authRouter);
// auth on every endpoint (besides previous logins/registration)
app.use("/api/users/", auth, usersRouter);
app.use("/api/service/", auth, serviceRouter);
app.use("/api", auth, mainRouter);

app.use("/proxy", proxyAuth, proxyRouter);

//redirect to client
app.use("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/../client/build/index.html"));
});

export default app;

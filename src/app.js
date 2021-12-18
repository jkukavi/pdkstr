const express = require("express");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const path = require("path");

const { CSPPolicies } = require("./consts");
const authRouter = require("./routers/authRouter");
const { auth, proxyAuth } = require("./middleware/auth");
const { upgradeToSSLIfNecessary } = require("./middleware/sslUpgrade");
const mainRouter = require("./routers/mainRouter");
const usersRouter = require("./routers/usersRouter");
const proxyRouter = require("./routers/proxyRouter");

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
app.use("/", express.static("client/dist"));

// Backend is routed with:
app.use(authRouter);
// auth on every endpoint (besides previous logins/registration)
app.use("/api/users/", auth, usersRouter);
app.use("/api", auth, mainRouter);
app.use("/proxy", proxyAuth, proxyRouter);

//redirect to client
app.use("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/../client/dist/index.html"));
});

module.exports = app;

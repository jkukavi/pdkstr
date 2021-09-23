const express = require("express");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const path = require("path");

const { CSPPolicies } = require("./consts");
const authRouter = require("./routers/authRouter");
const { auth, proxyAuth } = require("./auth");
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

// Clients static files are served with:
app.use("/", express.static("client/build"));

// Backend is routed with:
app.use(authRouter);
// auth on every endpoint (besides previous logins/registration)
app.use("/api/users/", auth, usersRouter);
app.use("/api", auth, mainRouter);
app.use("/proxy", proxyAuth, proxyRouter);

//redirect to client
app.use("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/../client/build/index.html"));
});

console.log("server started 8080");

module.exports = app;

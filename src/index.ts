import app from "./app";
import { connect } from "./db";

const port = process.env.PORT || 8080;

const initServer = async () => {
  await connect();
  app.listen(port, () => {
    console.log("Server started on port " + port);
  });
};

initServer();

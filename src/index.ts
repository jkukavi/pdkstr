const app = require("./app");
const { connect } = require("./db");

const port = process.env.PORT || 8080;

(async () => {
  await connect();
  app.listen(port, () => {
    console.log("Server started on port " + port);
  });
})();

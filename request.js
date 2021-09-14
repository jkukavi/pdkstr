const request = require("request");

const body = {
  username: "jozo",
  email: "vincentofthe@gmail.com",
  password: "žaba",
};

const register = async () => {
  request.post(
    { url: "http://localhost:8080/register", body, json: true },
    (err, res, body) => {
      console.log(res.statusCode);
      console.log(body || err);
    }
  );

  return null;
};

const login = () => {
  request.post(
    {
      url: "http://localhost:8080/login",
      body: { email: body.email, password: body.password },
      json: true,
    },
    (err, res, body) => {
      console.log(res.statusCode);
      console.log(body || err);
    }
  );
  return null;
};

const activateEmail = (url) => {
  request.get(
    {
      url,
    },
    (err, res, body) => {
      console.log(res?.statusCode);
      console.log(body || err);
    }
  );
  return null;
};

module.exports = {
  register,
  login,
  activateEmail,
};

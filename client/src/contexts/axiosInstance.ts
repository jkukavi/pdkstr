import axios from "axios";

const instance = axios.create({ baseURL: "/api" });

type Token = string | null;

let token: Token = null;
let logout: VoidFunction,
  destroySession: VoidFunction,
  reestablishSession: VoidFunction;

interface Session {
  destroySession: VoidFunction;
  reestablishSession: VoidFunction;
  logout: VoidFunction;
}

const instantiateInstance = (session: Session) => {
  destroySession = session.destroySession;
  reestablishSession = session.reestablishSession;
  logout = session.logout;
};

const refreshToken = async () => {
  const res = await axios.get("/rt");
  const { token } = res.data;
  setToken(token);
  return null;
};

const getToken = () => token;

const setToken = (newToken: Token) => {
  instance.defaults.headers.common["Authorization"] = "Bearer " + newToken;
  token = newToken;
};

const removeToken = () => {
  delete instance.defaults.headers.common["Authorization"];
  token = null;
};

const reestablishSessionInOtherWindows = () => {
  window.localStorage.setItem("loggedIn", "true" + Date.now());
};

const destroySessionInOtherWindows = () => {
  window.localStorage.setItem("loggedIn", "false");
};

window.addEventListener("storage", (evt) => {
  const globalLogout = evt.key === "loggedIn" && evt.newValue === "false";

  const globalLogin =
    evt.key === "loggedIn" && evt.newValue?.slice(0, 4) === "true";

  if (globalLogout) {
    destroySession();
  } else if (globalLogin) {
    reestablishSession();
  }
});

instance.interceptors.response.use(
  function (res) {
    return res;
  },
  async function (err) {
    if (err.response.status === 401) {
      try {
        await refreshToken();
        delete err.config.headers["Authorization"];
        return instance.request(err.config);
      } catch {
        await logout();
      }
    }
    return Promise.reject(err);
  }
);

export {
  instance,
  instantiateInstance,
  destroySessionInOtherWindows,
  reestablishSessionInOtherWindows,
  getToken,
  setToken,
  refreshToken,
  removeToken,
};

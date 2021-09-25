import React, { useEffect, useState, createContext, useContext } from "react";
import axios from "axios";

import {
  instantiateInstance,
  instance,
  refreshToken,
  setToken,
  removeToken,
  reestablishSessionInOtherWindows,
  destroySessionInOtherWindows,
} from "./axiosInstance";

import parseFormData from "../helpers/parseFormData";

const AuthContext = createContext({ user: null });

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (e) => {
    e.preventDefault();

    const body = parseFormData(e.target);

    const response = await axios.post("/login", body);

    if (response.status === 200) {
      const { token, username } = response.data;
      setUser(username);
      setToken(token);
      reestablishSessionInOtherWindows();
    } else {
      throw new Error("wrong credentials");
    }
  };

  const logout = async () => {
    await axios.get("/logout", { timeout: 1000 });
    destroySession();
    destroySessionInOtherWindows();
  };

  const destroySession = async () => {
    removeToken();
    setUser(null);
  };

  const reestablishSession = async () => {
    const loggedIn = window.localStorage.getItem("loggedIn") || "";
    if (loggedIn.slice(0, 4) === "true") {
      await refreshToken();
      await getMyUser();
    } else {
      throw new Error();
    }
  };

  useEffect(() => {
    instantiateInstance({ logout, reestablishSession, destroySession });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getMyUser = async () => {
    const response = await instance.get("/users/me");

    if (response.status === 200) {
      const { username } = response.data;
      setUser(username);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login,
        logout,
        reestablishSession,
        getMyUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuthContext = () => {
  const useAuthContext = useContext(AuthContext);
  return useAuthContext;
};

export default AuthContextProvider;
export { useAuthContext };

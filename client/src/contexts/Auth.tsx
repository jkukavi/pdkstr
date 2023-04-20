import React, { useEffect, useState, createContext, useContext } from "react";
import axios from "axios";

import parseFormData from "helpers/parseFormData";

import {
  instantiateInstance,
  instance,
  refreshToken,
  setToken,
  removeToken,
  reestablishSessionInOtherWindows,
  destroySessionInOtherWindows,
} from "./axiosInstance";

interface VoidFunction {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (args?: any): void;
}

const AuthContext = createContext<{
  user: { name: string } | null;
  login: VoidFunction;
  reestablishSession: VoidFunction;
  setUser: VoidFunction;
  logout: VoidFunction;
  getMyUser: () => Promise<void>;
}>({
  user: null,
  login: async () => null,
  reestablishSession: async () => null,
  setUser: () => null,
  logout: () => null,
  getMyUser: async () => {},
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const AuthContextProvider = ({ children }: { children: any }) => {
  const [user, setUser] = useState<{ name: string } | null>(null);

  const login = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const body = parseFormData(e.currentTarget);

    const response = await axios.post("/login", body);

    if (response.status === 200) {
      const { token, username } = response.data;
      setUser({ name: username });
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
  }, []);

  const getMyUser = async () => {
    const response = await instance.get("/users/me");

    if (response.status === 200) {
      const { username } = response.data;
      setUser({ name: username });
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

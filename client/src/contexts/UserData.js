import React, { useState, useContext } from "react";

import { notify } from "../components/Notifications";
import { instance as axios } from "./axiosInstance";
import { addRandomKey } from "helpers";

const UserDataContext = React.createContext({
  history: [],
  favourites: [],
});

export const UserDataProvider = ({ children }) => {
  console.log("user");
  const [history, setHistory] = useState(null);
  const [favourites, setFavourites] = useState(null);

  const loadHistory = async () => {
    try {
      const response = await axios.get("/users/my/history");
      const fetchedHistory = response.data.map(addRandomKey);
      setHistory(fetchedHistory);
    } catch (e) {
      notify("Unable to fetch history");
    }
  };

  const loadFavourites = async () => {
    try {
      const response = await axios.get("/users/my/favourites");
      const fetchedFavourites = response.data.map(addRandomKey);
      setFavourites(fetchedFavourites);
    } catch (e) {
      notify("Unable to fetch history");
    }
  };

  const value = {
    history,
    loadHistory,
    favourites,
    loadFavourites,
  };
  return (
    <UserDataContext.Provider value={value}>
      {children}
    </UserDataContext.Provider>
  );
};

export const useUserData = () => {
  return useContext(UserDataContext);
};

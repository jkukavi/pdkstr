import React, { useState, useContext } from "react";

import { addRandomKey } from "helpers";

import { notify } from "components/Notifications";

import { instance as axios } from "./axiosInstance";

type FunctionType = () => void;

const UserDataContext = React.createContext<{
  history: Item[];
  favourites: AnyItem[];
  loadHistory: FunctionType;
  loadFavourites: FunctionType;
}>({
  history: [],
  favourites: [],
  loadHistory: () => {},
  loadFavourites: () => {},
});

export const UserDataProvider = ({ children }: { children: JSX.Element }) => {
  const [history, setHistory] = useState<Item[]>([]);
  const [favourites, setFavourites] = useState<AnyItem[]>([]);

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

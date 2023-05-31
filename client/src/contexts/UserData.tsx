import React, { useState, useContext } from "react";

import { notify } from "components/Notifications";
import { getMyFavourites, getMyHistory } from "apiCalls";

type FunctionType = (arg: any) => void;

const UserDataContext = React.createContext<{
  favourites: AnyItem[];
  loadFavourites: (type: ItemType, queryString: string) => void;
  loading: boolean;
}>({
  favourites: [],
  loadFavourites: (type: ItemType, queryString: string) => {},
  loading: false,
});

export const UserDataProvider = ({ children }: { children: JSX.Element }) => {
  const [loading, setLoading] = useState(false);
  const [favourites, setFavourites] = useState<AnyItem[]>([]);

  const loadFavourites = async (
    type: ItemType = "item",
    queryString: string
  ) => {
    setLoading(true);
    try {
      const fetchedFavourites = await getMyFavourites(type, queryString);
      setFavourites(fetchedFavourites);
    } catch (e) {
      notify("Unable to fetch history");
    }
    setLoading(false);
  };

  const value = {
    history,
    favourites,
    loadFavourites,
    loading,
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

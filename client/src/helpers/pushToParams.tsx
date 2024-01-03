import queryString from "query-string";
import React, { useState } from "react";

const engineShorthands: {
  [key in Engine]: string;
} = {
  youtube: "yt",
  soundcloud: "sc",
};

window.addEventListener("beforeunload", function (e) {
  const t = document.getElementById("my-audio") as HTMLAudioElement;

  if (t) {
    const currentTimeInS = Math.floor(t.currentTime);
    this.localStorage.setItem("t", currentTimeInS.toString());
  }
});

export const getTimeOfPreviouslyPlayedItem = () => {
  const time = localStorage.getItem("t");
  if (!time || typeof time !== "string") return null;
  return time;
};

export const pushListeningItemToParams = (item: Item | Playlist) => {
  const engineShorthand = engineShorthands[item.engine];

  const listeningToParam = `${engineShorthand}.${item.id}`;

  if (item.type === "item") {
    pushToParams({
      lto: listeningToParam,
    });
  } else if (item.type === "playlist") {
    pushToParams({
      pt: listeningToParam,
    });
  }
};

const notifyThatQueryStringWasUpdated = {
  current: () => {},
};

export const QueryStringContext = React.createContext({});

export const QueryStringHasChangedProvider = ({
  children,
}: {
  children: any;
}) => {
  const [uniqueState, setState] = useState({});

  const refresh = () => {
    setState({});
  };

  notifyThatQueryStringWasUpdated.current = () => {
    setTimeout(refresh);
  };

  return (
    <QueryStringContext.Provider value={uniqueState}>
      {children}
    </QueryStringContext.Provider>
  );
};

export const useQueryStringWasUpdated = () => {
  React.useContext(QueryStringContext);
};

export const pushToParams = (queryParams: {
  search?: string;
  lto?: string;
  pt?: string;
  t?: number;
}) => {
  const currentQueryParams = queryString.parse(location.search);

  const newQueryParams = { ...currentQueryParams, ...queryParams };

  const newQueryString = queryString.stringify(newQueryParams, {
    skipEmptyString: true,
    skipNull: true,
  });

  history.pushState(null, "", "?" + newQueryString);

  notifyThatQueryStringWasUpdated.current();
};

export const getQueryParams = () => {
  return queryString.parse(window.location.search) as {
    search: string;
    pt: string;
    lto: string;
  };
};

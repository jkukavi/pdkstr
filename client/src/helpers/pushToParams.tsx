import queryString from "query-string";

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

  if (item.type === "video") {
    pushToParams({
      lto: listeningToParam,
    });
  } else if (item.type === "playlist") {
    pushToParams({
      pt: listeningToParam,
    });
  }
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
};

export const getQueryParams = () => {
  return queryString.parse(location.search) as {
    search: string;
    pt: string;
    lto: string;
  };
};

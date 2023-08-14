import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { SearchBox } from "components/Search/SearchBox";
import { Player } from "components/AudioShelf/Player";
import { fetchItemInfo } from "apiCalls";
import {
  getQueryParams,
  getTimeOfPreviouslyPlayedItem,
} from "helpers/pushToParams";
import { PlayingQueue } from "components/AudioShelf/PlayingQueue";

const engineShorthands: {
  [key: string]: Engine;
} = {
  yt: "youtube",
  sc: "soundcloud",
};

const tryPlayingItem = async (
  id: string,
  engine: Engine,
  time: string | null
) => {
  const item = await fetchItemInfo(id, engine);

  const initialTime = time ? Number(time) : null;

  if (item) {
    Player.playItem(item, initialTime);
  }
};

export const useLoadAppStateFromSearchQuery = () => {
  const location = useLocation();

  useEffect(() => {
    const { search, lto, pt } = getQueryParams();
    const time = getTimeOfPreviouslyPlayedItem();

    if (search) {
      SearchBox.searchForItems(null, search);
    }

    if (lto) {
      const [engineShorthand, id] = (lto as string).split(".");

      const engine = engineShorthands[engineShorthand];

      tryPlayingItem(id, engine, time);
    }

    if (pt) {
      const [engineShorthand, id] = (pt as string).split(".");

      const engine = engineShorthands[engineShorthand];

      PlayingQueue.loadPlaylist(id, engine);
    }
  }, []);
};

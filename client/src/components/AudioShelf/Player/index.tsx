import { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";

import { fetchDirectUrl, addToHistory } from "apiCalls";
import { SearchEngineIcon } from "consts";
import useConnectPropsToObserver from "hooks/useConnectPropsToObserver";

import CustomPlayer from "components/CustomPlayer";
import { notify } from "components/Notifications";
import MiniLoader from "components/MiniLoader";

import { PlayingQueue } from "../PlayingQueue";
import PlayerControls from "./PlayerControls";

const initialState: InitialState = {
  directUrl: null,
  audioLoading: false,
  listeningTo: null,
  subscribers: [],
};

interface InitialState {
  directUrl: string | null;
  audioLoading: boolean;
  listeningTo: Item | null;
  subscribers: { id: string; fn: VoidFunction }[];
}

interface PlayerInterface extends InitialState {
  updateState: VoidFunction;
  playItem: (item: Item) => Promise<void>;
  notifySubscribers: VoidFunction;
  subscribe: (fn: VoidFunction) => string;
  unsubscribe: (id: string) => void;
}

interface VoidFunction {
  (args?: any): void;
}

export const Player: PlayerInterface = {
  ...initialState,
  updateState: () => {},
  playItem: async function (item: Item) {
    const { id, engine, url } = item;
    this.updateState({ directUrl: null, audioLoading: true });
    notify("Trying to fetch audio.");
    try {
      const directUrl = await fetchDirectUrl({ id, engine, url });
      this.updateState({
        directUrl,
        audioLoading: false,
        listeningTo: item,
      });
      addToHistory(item);
      notify(`Listening to: ${item.title}`);
    } catch (e) {
      this.updateState({
        directUrl: null,
        audioLoading: false,
      });
      notify(`Unable to fetch audio from ${engine}.`);
    }
  },
  notifySubscribers: () => {
    const { listeningTo, audioLoading } = Player;
    for (const subscriber of Player.subscribers) {
      subscriber.fn({ listeningTo, audioLoading });
    }
  },
  subscribe: (fn: VoidFunction) => {
    const id = uuid();
    Player.subscribers.push({ fn, id: id });
    return id;
  },
  unsubscribe: (id: string) => {
    const index = Player.subscribers.findIndex((item) => item.id === id);
    if (index) Player.subscribers.splice(index, 1);
  },
};

const PlayerComponent = () => {
  const [audioPlayerState, setAudioPlayerState] = useState(initialState);
  const { directUrl, audioLoading, listeningTo } = audioPlayerState;
  const updateState = (newState: Partial<InitialState>) => {
    setAudioPlayerState({
      ...audioPlayerState,
      ...newState,
    });
  };
  const props = { updateState, listeningTo, audioLoading };
  useConnectPropsToObserver(props, Player);
  useEffect(() => Player.notifySubscribers(), [listeningTo, audioLoading]);

  const onAudioError = () => {
    notify("Something went wrong with trying to play this item.");
    //this case needs improvement, defaults to playing next..
  };

  const onAudioEnded = () => {
    PlayingQueue.playNext();
  };

  const playerInactive = !(directUrl || audioLoading);

  if (playerInactive) return null;
  if (audioLoading || !directUrl || !listeningTo) return <MiniLoader />;
  return (
    <div className="audioPlayerContainer">
      <CustomPlayer
        onEnded={onAudioEnded}
        onError={onAudioError}
        controls
        autoPlay
        currentlyPlaying={
          <>
            <SearchEngineIcon engine={listeningTo.engine} />
            {listeningTo.title}
          </>
        }
      >
        <source src={directUrl} type="audio/webm" />
        <source
          src={`proxy/${encodeURIComponent(directUrl)}`}
          type="audio/webm"
        />
      </CustomPlayer>
      <PlayerControls />
    </div>
  );
};

export default PlayerComponent;

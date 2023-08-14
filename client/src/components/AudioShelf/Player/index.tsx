import React, { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";

import { fetchDirectUrl, addToHistory } from "apiCalls";
import { SearchEngineIcon } from "consts";
import useConnectPropsToObserver from "hooks/useConnectPropsToObserver";

import { Audio as AudioElement } from "@mikivela/plyr/dist";
import "@mikivela/plyr/dist/index.css";
import { notify } from "components/Notifications";
import MiniLoader from "components/Loaders/MiniLoader";
import { ExpandButton } from "../ExpandableContainer";

import { PlayingQueue } from "../PlayingQueue";
import { pushListeningItemToParams } from "helpers/pushToParams";

const initialState: InitialState = {
  time: null,
  directUrl: null,
  audioLoading: false,
  listeningTo: null,
  subscribers: [],
};

type DirectUrl = {
  url: string;
  mimeType: string;
};

interface InitialState {
  time: number | null;
  directUrl: null | string;
  audioLoading: boolean;
  listeningTo: Item | null;
  subscribers: { id: string; fn: VoidFunction }[];
}

interface PlayerInterface extends InitialState {
  updateState: VoidFunction;
  playItem: (item: Item, time?: number | null) => Promise<void>;
  notifySubscribers: VoidFunction;
  subscribe: (fn: VoidFunction) => string;
  unsubscribe: (id: string) => void;
}

interface VoidFunction {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (args?: any): void;
}

const audioTestElement = new Audio();

const probablyCouldBePlayed = (media: DirectUrl): boolean => {
  const couldBePlayed = audioTestElement.canPlayType(media.mimeType);
  return !!couldBePlayed;
};

export const Player: PlayerInterface = {
  ...initialState,
  updateState: () => null,
  playItem: async function (item: Item, time?: number | null) {
    const { id, engine, url } = item;
    this.updateState({ directUrl: null, audioLoading: true });
    notify("Trying to fetch audio.");
    try {
      const directUrls = await fetchDirectUrl({ id, engine, url });
      const playableMedia = directUrls.filter(probablyCouldBePlayed);
      this.updateState({
        time,
        directUrl: playableMedia[0].url,
        audioLoading: false,
        listeningTo: item,
      });
      pushListeningItemToParams(item);
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

  const onLoadedMetadata: React.ReactEventHandler<HTMLAudioElement> = (e) => {
    const time = audioPlayerState.time;

    if (time) {
      const player = e.currentTarget;
      player.currentTime = time;
    }
  };

  const playerInactive = !(directUrl || audioLoading);

  if (playerInactive) return null;
  if (audioLoading || !directUrl || !listeningTo) return <MiniLoader />;
  return (
    <AudioElement
      onEnded={onAudioEnded}
      onError={onAudioError}
      onLoadedMetadata={onLoadedMetadata}
      autoPlay
      controls
      currentlyPlaying={
        <>
          <SearchEngineIcon engine={listeningTo.engine} />
          {listeningTo.title}
        </>
      }
      additionalButtons={<ExpandButton />}
    >
      <source src={directUrl} />
      <source
        src={`${location.origin}/proxy/${encodeURIComponent(directUrl)}`}
      />
    </AudioElement>
  );
};

export default PlayerComponent;

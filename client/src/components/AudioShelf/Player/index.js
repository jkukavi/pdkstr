import React, { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";

import { fetchDirectUrl, addToHistory } from "apiCalls";
import { SearchEngineIcon } from "consts";
import useConnectPropsToObserver from "hooks/useConnectPropsToObserver";

import CustomPlayer from "components/CustomPlayer";
import { notify } from "components/Notifications";
import MiniLoader from "components/MiniLoader";

import { PlayingQueue } from "../PlayingQueue";
import PlayerControls from "./PlayerControls";

export const Player = {
  listeningTo: null,
  audioLoading: null,
  updateState: null,
  playItem: async function (item) {
    const { id, engine, url } = item;
    this.updateState({ directUrl: null, audioLoading: true });
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
      notify("Something went wrong. Try again.");
    }
  },
  notifySubscribers: () => {
    const { listeningTo, audioLoading } = Player;
    for (const subscriber of Player.subscribers) {
      subscriber.fn({ listeningTo, audioLoading });
    }
  },
  subscribe: (fn) => {
    const id = uuid();
    Player.subscribers.push({ fn, id: id });
    return id;
  },
  unsubscribe: (id) => {
    const index = Player.subscribers.findIndex((item) => item.id === id);
    if (index) Player.subscribers.splice(index, 1);
  },
  subscribers: [],
};

const initialState = {
  directUrl: null,
  audioLoading: false,
  listeningTo: null,
};

const PlayerComponent = () => {
  const [audioPlayerState, setAudioPlayerState] = useState(initialState);
  const { directUrl, audioLoading, listeningTo } = audioPlayerState;
  const updateState = (newState) => {
    setAudioPlayerState({
      ...audioPlayerState,
      ...newState,
    });
  };
  const props = { updateState, listeningTo, audioLoading };
  useConnectPropsToObserver(props, Player);
  useEffect(() => Player.notifySubscribers(), [listeningTo, audioLoading]);

  const onAudioError = (e) => {
    notify("Something went wrong with trying to play this item.");
    //this case needs improvement, defaults to playing next..
  };

  const onAudioEnded = () => {
    PlayingQueue.playNext();
  };

  const playerInactive = !(directUrl || audioLoading);

  if (playerInactive) return null;
  if (audioLoading) return <MiniLoader />;
  return (
    <div className="audioPlayerContainer">
      <CustomPlayer
        defaultAudioPlayer={
          <audio
            id="my-audio"
            onEnded={onAudioEnded}
            onError={onAudioError}
            controls
            autoPlay
          >
            <source
              src={`proxy/${encodeURIComponent(directUrl)}`}
              type="audio/webm"
            />
            <source src={directUrl} type="audio/webm" />
          </audio>
        }
        currentlyPlaying={
          <>
            <SearchEngineIcon engine={listeningTo.engine} />
            {listeningTo.title}
          </>
        }
      />
      <PlayerControls />
    </div>
  );
};

export default PlayerComponent;

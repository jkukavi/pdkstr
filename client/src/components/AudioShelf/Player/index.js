import React, { useState, useEffect } from "react";

import { v4 as uuid } from "uuid";

import { fetchDirectUrl, addToHistory } from "../../../apiCalls";

import CustomPlayer from "../../CustomPlayer";
import { notify } from "../../Notifications";
import { SearchEngineIcon } from "../../../consts";
import MiniLoader from "../../../components/MiniLoader";
import PlayerControls from "./PlayerControls";

import { PlayingQueue } from "../PlayingQueue";

export const Player = {
  playItem: null,
  listeningTo: null,
  notifySubscribers: (listeningTo) => {
    for (const subscribers of Player.subscribers) {
      subscribers.fn(listeningTo);
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
  useEffect(() => Player.notifySubscribers(listeningTo), [listeningTo]);

  const updateState = (newState) => {
    setAudioPlayerState({
      ...audioPlayerState,
      ...newState,
    });
  };

  const onAudioError = () => {
    notify("Something went wrong with trying to play this item.");
    updateState({ directUrl: null });
    onAudioEnded();
  };

  const onAudioEnded = () => {
    PlayingQueue.playNext();
  };

  const playItem = async (item) => {
    const { id, engine, url } = item;
    updateState({ directUrl: null, audioLoading: true });
    try {
      const directUrl = await fetchDirectUrl({ id, engine, url });
      updateState({
        directUrl,
        loading: false,
        listeningTo: item,
      });
      addToHistory(item);
      notify(`Listening to: ${item.title}`);
    } catch (e) {
      notify("Something went wrong. Try again.");
    }
  };

  Player.playItem = playItem;
  Player.listeningTo = listeningTo;

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
            <source src={directUrl} type="audio/webm" />
            <source
              src={`proxy/${encodeURIComponent(directUrl)}`}
              type="audio/webm"
            />
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

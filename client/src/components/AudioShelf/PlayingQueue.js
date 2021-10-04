import React, { useState, useEffect } from "react";

import { getPlaylistItems } from "../../apiCalls";

import { addRandomKey } from "helpers";
import speak from "helpers/speak";

import { Player } from "./Player";

import { notify } from "../Notifications";

import Table from "../Table";

export const PlayingQueue = {
  playlist: [],
  playPlaylist: null,
  playNext: null,
  addToQueue: null,
  notify: null,
};

const PlayingQueueComponent = () => {
  const [state, setState] = useState({ playlist: [] });
  const playlist = state.playlist;

  useEffect(() => {
    if (PlayingQueue.notify) {
      PlayingQueue.notify(!!state.playlist.length);
    }
  }, [state]);

  const updateState = (newState) => {
    setState((prevState) => ({ ...prevState, ...newState }));
  };

  const playPlaylist = async (playlist) => {
    try {
      const playlistItems = await getPlaylistItems(playlist);
      updateState({
        playlist: playlistItems.map(addRandomKey),
      });
      Player.playItem(playlistItems[0]);
    } catch (e) {
      notify("Something went wrong with trying to play this playlist.");
    }
  };

  const playNext = () => {
    if (playlist.length !== 0) {
      if (Player.listeningTo)
        speak(`Item ${Player.listeningTo.title.slice(0, 20)} ended`);
      const playedIndex = playlist.findIndex(
        (item) => item.title === Player.listeningTo.title
      );
      const nextIndex = playedIndex === -1 ? 0 : playedIndex + 1;
      const nextItem = playlist[nextIndex];
      if (nextItem) {
        speak(`Playing ${nextItem.title.slice(0, 20)} next`);
        Player.playItem(nextItem);
      }
    }
  };

  const addToQueue = (item) => {
    if (playlist.length === 0) {
      if (!Player.listeningTo) {
        Player.playItem(item);
        updateState({
          playlist: [item],
        });
      } else {
        updateState({
          playlist: [Player.listeningTo, item],
        });
      }
    } else {
      updateState({
        playlist: [...playlist, item],
      });
    }
    notify("Added to playing queue");
  };

  PlayingQueue.addToQueue = addToQueue;
  PlayingQueue.playNext = playNext;
  PlayingQueue.playPlaylist = playPlaylist;
  PlayingQueue.playlist = playlist;

  if (!playlist.length) return null;

  return (
    <div
      style={{
        marginLeft: "calc(50% - 0.5rem)",
        transform: "translate(-100%)",
      }}
    >
      <Table tableTitle="Playing queue" tableArray={playlist} />
    </div>
  );
};

export default PlayingQueueComponent;

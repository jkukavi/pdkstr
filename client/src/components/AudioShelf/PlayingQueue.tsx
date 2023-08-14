import React, { useState, useEffect } from "react";

import { getPlaylistItems } from "apiCalls";

import { addRandomKey } from "helpers";
import speak from "helpers/speak";

import { notify } from "components/Notifications";
import Table from "components/Table";

import { Player } from "./Player";
import { pushListeningItemToParams } from "helpers/pushToParams";

const noOp = () => {};

interface VoidFunction {
  (...args: any[]): void;
}

interface PlayingQueueInterface {
  playlist: Item[];
  loadPlaylist: VoidFunction;
  playPlaylist: VoidFunction;
  playNext: VoidFunction;
  addToQueue: VoidFunction;
  notify: VoidFunction;
}

export const PlayingQueue: PlayingQueueInterface = {
  playlist: [],
  loadPlaylist: noOp,
  playPlaylist: noOp,
  playNext: noOp,
  addToQueue: noOp,
  notify: noOp,
};

const PlayingQueueComponent = () => {
  const [state, setState] = useState({ playlist: PlayingQueue.playlist });
  const playlist = state.playlist;

  useEffect(() => {
    if (PlayingQueue.notify) {
      PlayingQueue.notify(!!state.playlist.length);
    }
  }, [state]);

  const updateState = (newState: typeof state) => {
    setState((prevState) => ({ ...prevState, ...newState }));
  };

  const loadPlaylist = async (playlistId: string, engine: Engine) => {
    try {
      const playlistItems = await getPlaylistItems(playlistId, engine);
      updateState({
        playlist: playlistItems.map(addRandomKey) as Item[],
      });
    } catch (e) {
      notify("Something went wrong with trying to play this playlist.");
    }
  };

  const playPlaylist = async (playlist: Playlist) => {
    try {
      const playlistItems = await getPlaylistItems(
        playlist.id,
        playlist.engine
      );
      updateState({
        playlist: playlistItems.map(addRandomKey) as Item[],
      });
      pushListeningItemToParams(playlist);
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
        (item) => item.title === Player.listeningTo?.title
      );
      const nextIndex = playedIndex === -1 ? 0 : playedIndex + 1;
      const nextItem = playlist[nextIndex];
      if (nextItem) {
        speak(`Playing ${nextItem.title.slice(0, 20)} next`);
        Player.playItem(nextItem);
      }
    }
  };

  const addToQueue = (item: Item) => {
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
  PlayingQueue.loadPlaylist = loadPlaylist;
  PlayingQueue.playPlaylist = playPlaylist;
  PlayingQueue.playlist = playlist;

  if (!playlist.length) return null;

  return <Table tableTitle="Playing queue" tableArray={playlist} />;
};

export default PlayingQueueComponent;

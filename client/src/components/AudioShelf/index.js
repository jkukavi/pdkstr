import React, { useEffect, useState } from "react";

import { getPlaylistItems, fetchDirectUrl } from "../../apiCalls";

import { v4 as uuid } from "uuid";

import { addRandomKey } from "../../helpers/helpers";
import speak from "../../helpers/speak";

import { addToHistory } from "../../apiCalls";
import { notify } from "../Notifications";

import ExpandableContainer from "./ExpandableContainer";
import PlayingQueTable from "./PlayingQueTable";
import AudioPlayerComponent from "./AudioPlayerComponent";

export const AudioPlayer = {
  playItem: null,
  playPlaylist: null,
  addToQueue: null,
  listeningTo: null,
  subscribe: (fn) => {
    const id = uuid();
    AudioPlayer.subscribers.push({ fn, id: id });
    return id;
  },
  unsubscribe: (id) => {
    const index = AudioPlayer.subscribers.findIndex((item) => item.id === id);
    if (index) AudioPlayer.subscribers.splice(index, 1);
  },
  subscribers: [],
};

const notifySubscribers = (listeningTo) => {
  for (const subscribers of AudioPlayer.subscribers) {
    subscribers.fn(listeningTo);
  }
};

const initialState = {
  directUrl: null,
  audioLoading: false,
  playlist: [],
  listeningTo: false,
};

const AudioShelf = () => {
  const [audioPlayerState, setAudioPlayerState] = useState(initialState);
  const { directUrl, audioLoading, playlist, listeningTo } = audioPlayerState;

  useEffect(() => notifySubscribers(listeningTo), [listeningTo]);

  const updateState = (newState) => {
    setAudioPlayerState({
      ...audioPlayerState,
      ...newState,
    });
  };

  const onAudioEnded = () => {
    playNext();
  };

  const onAudioError = () => {
    notify("Something went wrong with trying to play this item.");
    updateState({ directUrl: null });
    onAudioEnded();
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

  const playPlaylist = async (playlist) => {
    try {
      const playlistItems = await getPlaylistItems(playlist);
      updateState({
        playlist: playlistItems.map(addRandomKey),
        listeningTo: playlistItems[0],
      });
      playItem();
    } catch (e) {
      notify("Something went wrong with trying to play this playlist.");
    }
  };

  const playNext = () => {
    if (playlist.length !== 0) {
      if (listeningTo) speak(`Item ${listeningTo.title.slice(0, 20)} ended`);
      const playedIndex = playlist.findIndex(
        (item) => item.title === listeningTo.title
      );
      const nextIndex = playedIndex === -1 ? 0 : playedIndex + 1;
      const nextItem = playlist[nextIndex];
      if (nextItem) {
        speak(`Playing ${nextItem.title.slice(0, 20)} next`);
        playItem(nextItem);
      }
    }
  };

  const addToQueue = (item) => {
    if (playlist.length === 0) {
      if (!listeningTo) {
        playItem(item);
        updateState({
          playlist: [item],
        });
      } else {
        updateState({
          playlist: [listeningTo, item],
        });
      }
    } else {
      updateState({
        playlist: [...playlist, item],
      });
    }
    notify("Added to playing queue");
  };

  AudioPlayer.playItem = playItem;
  AudioPlayer.playPlaylist = playPlaylist;
  AudioPlayer.addToQueue = addToQueue;
  AudioPlayer.listeningTo = listeningTo;

  return (
    <ExpandableContainer
      directUrl={directUrl}
      audioLoading={audioLoading}
      playlist={playlist}
    >
      {(directUrl || audioLoading) && (
        <AudioPlayerComponent
          audioLoading={audioLoading}
          onAudioEnded={onAudioEnded}
          onAudioError={onAudioError}
          directUrl={directUrl}
          listeningTo={listeningTo}
          playlist={playlist}
        />
      )}
      {!!playlist.length && <PlayingQueTable playlist={playlist} />}
    </ExpandableContainer>
  );
};

export default AudioShelf;

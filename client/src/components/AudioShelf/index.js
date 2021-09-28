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
  getDirectUrl: null,
  playPlaylist: null,
  setActiveVideo: null,
  setListeningTo: null,
  addToQueue: null,
  listeningTo: null,
  activeVideo: null,
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

const AudioShelf = () => {
  const [directUrl, setDirectUrl] = useState(null);
  const [audioLoading, setAudioLoading] = useState(false);
  const [playlist, setPlaylist] = useState([]);
  const [listeningTo, setListeningTo] = useState(null);
  const [activeVideo, setActiveVideo] = useState(null);

  useEffect(() => {
    AudioPlayer.getDirectUrl = getDirectUrl;
    AudioPlayer.playPlaylist = playPlaylist;
    AudioPlayer.setActiveVideo = setActiveVideo;
    AudioPlayer.setListeningTo = setListeningTo;
    AudioPlayer.addToQueue = addToQueue;
    AudioPlayer.listeningTo = listeningTo;
    AudioPlayer.activeVideo = activeVideo;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setDirectUrl, setAudioLoading, setPlaylist, setActiveVideo, activeVideo]);

  useEffect(() => notifySubscribers(listeningTo), [listeningTo]);

  const onAudioEnded = () => {
    playNext();
  };

  const onAudioError = () => {
    notify("Something went wrong with trying to play this item.");
    setDirectUrl(null);
    onAudioEnded();
  };

  const replay = (time) => () => {
    const audioPlayer = document.getElementById("my-audio");
    audioPlayer.currentTime = audioPlayer.currentTime + time;
  };

  const getDirectUrl = async ({ id, engine, url }) => {
    setDirectUrl(null);
    setAudioLoading(true);
    try {
      const directUrl = await fetchDirectUrl({ id, engine, url });
      setDirectUrl(directUrl);
    } catch (e) {
      notify("Something went wrong. Try again.");
    } finally {
      setAudioLoading(false);
    }
  };

  const playPlaylist = async (playlist) => {
    try {
      const playlistItems = await getPlaylistItems(playlist);
      setPlaylist(playlistItems.map(addRandomKey));
      setListeningTo(playlistItems[0]);
      getDirectUrl(playlistItems[0]);
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
      const nextItem = playlist[playedIndex + 1];
      if (nextItem) {
        speak(`Playing ${nextItem.title.slice(0, 20)} next`);
        setListeningTo(nextItem);
        getDirectUrl(nextItem);
      }
    }
  };

  const addToQueue = (item) => {
    if (playlist.length === 0) {
      getDirectUrl(item);
      setActiveVideo(null);
      setListeningTo(item);
      addToHistory(item);
      setTimeout(() => {
        notify(`Listening to: ${item.title}`);
      }, 500);
    }
    setPlaylist([...playlist, item]);
    notify("Added to playing queue");
  };

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
          replay={replay}
          playlist={playlist}
        />
      )}
      {!!playlist.length && (
        <PlayingQueTable
          playlist={playlist}
          activeVideo={activeVideo}
          setPlaylist={setPlaylist}
          listeningTo={listeningTo}
          getDirectUrl={getDirectUrl}
          setActiveVideo={setActiveVideo}
          setListeningTo={setListeningTo}
        />
      )}
    </ExpandableContainer>
  );
};

export default AudioShelf;

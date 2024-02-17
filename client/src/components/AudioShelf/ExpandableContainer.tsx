import React, { useState, useEffect } from "react";

import playingQueue from "icons/playingQueue.svg";
import chevron from "icons/chevron.svg";

import { useScrollingDownContext } from "contexts/ScrollingDown";
import { PlayingQueue, useObservePlayingQueue } from "./PlayingQueue";
import { Player, useObservePlayer } from "./Player";

const Container: {
  expanded: boolean;
  toggleExpanded: VoidFunction;
} = {
  expanded: false,
  toggleExpanded: () => {},
};

const ExpandableContainer = ({ children }: { children: any }) => {
  const scrollingDown = useScrollingDownContext("cardContainer");
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded((e) => {
      Container.expanded = !e;
      return !e;
    });
  };

  useEffect(() => {
    Container.toggleExpanded = toggleExpanded;
  }, [setExpanded]);

  const { audioLoading, listeningTo } = useObservePlayer();
  const isPlayerActive = Player.audioLoading || !!Player.listeningTo;

  const isShown = isPlayerActive && !scrollingDown;
  const isExpanded = expanded && isShown;

  return (
    <div
      className={`audioShelf ${isShown ? "" : "closed"} ${
        isExpanded ? "expanded" : ""
      }`}
    >
      {children}
    </div>
  );
};

export default ExpandableContainer;

export const ExpandButton = () => {
  const [localExpanded, setLocalExpanded] = useState(Container.expanded);

  const isPlaylistPlaying = useObservePlayingQueue();

  const toggleExpanded = () => {
    setLocalExpanded((e) => !e);
    Container.toggleExpanded();
  };

  // if (!isPlaylistPlaying) return null;

  return (
    <>
      <div style={{ borderLeft: "1px solid black" }}></div>
      <div
        className={`audioButton close ${localExpanded ? "expanded" : ""}`}
        onClick={toggleExpanded}
      >
        <img src={localExpanded ? chevron : playingQueue} alt="loading" />
      </div>
    </>
  );
};

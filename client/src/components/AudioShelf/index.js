import React from "react";

import ExpandableContainer from "./ExpandableContainer";
import PlayingQueue from "./PlayingQueue";
import Player from "./Player";

const AudioShelf = () => {
  const isPlayerActive = true;

  return (
    <ExpandableContainer isPlayerActive={isPlayerActive}>
      <Player />
      <PlayingQueue />
    </ExpandableContainer>
  );
};

export default AudioShelf;

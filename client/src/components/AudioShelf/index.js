import React from "react";

import ExpandableContainer from "./ExpandableContainer";
import PlayingQueue from "./PlayingQueue";
import Player from "./Player";

const AudioShelf = () => {
  return (
    <ExpandableContainer>
      <Player />
      <PlayingQueue />
    </ExpandableContainer>
  );
};

export default AudioShelf;

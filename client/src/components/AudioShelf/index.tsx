import React from "react";
import ExpandableContainer from "./ExpandableContainer";
import PlayingQueue from "./PlayingQueue";
import Player from "./Player";
import { ListeningToDetails } from "./ListeningToDetails";

const AudioShelf = () => {
  return (
    <ExpandableContainer>
      <Player />
      <ListeningToDetails />
      <PlayingQueue />
    </ExpandableContainer>
  );
};

export default AudioShelf;

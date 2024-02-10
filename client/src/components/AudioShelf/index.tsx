import React from "react";
import ExpandableContainer from "./ExpandableContainer";
import PlayingQueue from "./PlayingQueue";
import Player from "./Player";

const AdditionalInfo = () => {
  return <div>Hello</div>;
};

const AudioShelf = () => {
  return (
    <ExpandableContainer>
      <Player />
      <AdditionalInfo />
      <PlayingQueue />
    </ExpandableContainer>
  );
};

export default AudioShelf;

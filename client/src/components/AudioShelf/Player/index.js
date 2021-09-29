import React from "react";

import CustomPlayer from "../../CustomPlayer";

import { SearchEngineIcon } from "../../../consts";
import MiniLoader from "../../../components/MiniLoader";
import PlayerControls from "./PlayerControls";

const Player = ({
  audioLoading,
  directUrl,
  listeningTo,
  onAudioEnded,
  onAudioError,
}) => {
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

export default Player;

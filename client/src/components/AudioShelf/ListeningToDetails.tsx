import React from "react";
import { useObservePlayer } from "./Player";

const ListeningToDetails = () => {
  const { listeningTo } = useObservePlayer();

  if (!listeningTo) {
    return <></>;
  }

  return (
    <div style={{ height: 140, display: "flex" }}>
      <img
        style={{
          display: "inline",
          margin: 10,
          width: 120,
          height: 120,
          borderRadius: 5,
          boxShadow: "1px 1px 2px black",
          objectFit: "cover",
        }}
        src={listeningTo.thumbnails[0].url}
      />
      <div style={{ display: "inline", width: "300px" }}>
        <p>{listeningTo.title}</p>

        <p style={{ fontWeight: 500 }}>{listeningTo.author.name}</p>
        <a href={listeningTo.url} target="_blank" rel="noreferrer">
          Go To Source
        </a>
        <p style={{ fontWeight: 500 }}>{listeningTo.duration}</p>
      </div>
    </div>
  );
};

export { ListeningToDetails };

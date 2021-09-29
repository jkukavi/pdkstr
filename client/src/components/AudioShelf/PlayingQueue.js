import React from "react";

import Table from "../Table";

const PlayingQueue = ({ playlist }) => {
  if (!playlist.length) return null;

  return (
    <div
      style={{
        marginLeft: "calc(50% - 0.5rem)",
        transform: "translate(-100%)",
      }}
    >
      <Table tableTitle="Playing queue" tableArray={playlist} />
    </div>
  );
};

export default PlayingQueue;

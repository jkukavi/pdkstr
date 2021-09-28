import React from "react";

import Table from "../Table";

const PlayingQueTable = ({ playlist }) => {
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

export default PlayingQueTable;

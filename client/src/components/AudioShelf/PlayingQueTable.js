import React from "react";

import { notify } from "../Notifications";
import { getViewsString } from "../../helpers/helpers";

import Table from "../Table";

const PlayingQueTable = ({
  playlist,
  activeVideo,
  setPlaylist,
  listeningTo,
  getDirectUrl,
  setActiveVideo,
  setListeningTo,
}) => {
  return (
    <div
      style={{
        marginLeft: "calc(50% - 0.5rem)",
        transform: "translate(-100%)",
      }}
    >
      <Table
        tableTitle="Playing queue"
        notify={notify}
        tableArray={playlist}
        activeVideo={activeVideo}
        deleteAll={() => setPlaylist([])}
        listeningTo={listeningTo}
        getDirectUrl={getDirectUrl}
        setActiveVideo={setActiveVideo}
        setListeningTo={setListeningTo}
        getViewsString={getViewsString}
      />
    </div>
  );
};

export default PlayingQueTable;

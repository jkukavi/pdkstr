import React, { useEffect } from "react";

import Table from "./Table";

const History = ({
  listHistory,
  notify,
  deleteAll,
  listeningTo,
  browsingHistory,
  activeVideo,
  getDirectUrl,
  setActiveVideo,
  setListeningTo,
  getViewsString,
}) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(listHistory, []);

  return (
    <div className="tablePageContainer">
      <Table
        tableTitle="History"
        notify={notify}
        deleteAll={deleteAll("history")}
        listeningTo={listeningTo}
        tableArray={browsingHistory}
        activeVideo={activeVideo}
        getDirectUrl={getDirectUrl}
        setActiveVideo={setActiveVideo}
        setListeningTo={setListeningTo}
        getViewsString={getViewsString}
      />
    </div>
  );
};

export default History;

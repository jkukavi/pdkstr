import React, { useEffect } from "react";

import Table from "./Table";

const Favourites = ({
  listFavourites,
  notify,
  deleteAll,
  listeningTo,
  favourites,
  activeVideo,
  getDirectUrl,
  setActiveVideo,
  setListeningTo,
  getViewsString,
}) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(listFavourites, []);
  return (
    <div className="tablePageContainer">
      <Table
        tableTitle="Favourites"
        notify={notify}
        tableArray={favourites}
        listeningTo={listeningTo}
        deleteAll={deleteAll("favourites")}
        activeVideo={activeVideo}
        getDirectUrl={getDirectUrl}
        setActiveVideo={setActiveVideo}
        setListeningTo={setListeningTo}
        getViewsString={getViewsString}
      />
    </div>
  );
};

export default Favourites;

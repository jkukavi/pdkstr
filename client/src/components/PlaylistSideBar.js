import React, { useState, useEffect } from "react";

import Table from "./Table";
import playButtonThumbnail from "../icons/playButtonThumbnail.svg";
import chevron from "../icons/chevron.png";

const PlaylistSidebar = ({
  tableFunctions,
  browsingPlaylist,
  playPlaylist,
  closeBrowsingPlaylist,
}) => {
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    setExpanded(true);
  }, []);

  const controls = (
    <>
      <div
        style={{ cursor: "pointer", width: "20px", height: "20px" }}
        onClick={() => closeBrowsingPlaylist()}
      >
        <img
          style={{
            transform: "rotate(-90deg)",
            filter: "invert(1)",
            width: "100%",
            height: "100%",
          }}
          src={chevron}
          alt="alt"
        />
      </div>
      <div
        style={{
          cursor: "pointer",
          margin: "auto",
          width: "20px",
          height: "20px",
        }}
        onClick={() => {
          closeBrowsingPlaylist();
          playPlaylist(browsingPlaylist.info);
        }}
      >
        <img
          style={{ width: "100%", height: "100%" }}
          src={playButtonThumbnail}
          alt="alt"
        />
      </div>
    </>
  );

  return (
    <div className={`playlistSidebarContainer ${expanded ? "expanded" : ""}`}>
      <div></div>
      <Table controls={controls} {...tableFunctions} />
    </div>
  );
};

export default PlaylistSidebar;

import React, { useEffect } from "react";
import ReactDOM from "react-dom";

import Table from "./Table";
import playButtonThumbnail from "../icons/playButtonThumbnail.svg";
import chevron from "../icons/chevron.png";

const PlaylistSidebar = ({
  tableFunctions,
  browsingPlaylist,
  playPlaylist,
  closeBrowsingPlaylist,
}) => {
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

  useEffect(() => {
    if (browsingPlaylist.expanded) {
      setTimeout(() => {
        document.getElementById("root").classList.add("blurredAndOverlayed");
        document.getElementById("hell").classList.add("highlighted");
      }, 600);
    } else {
      document.getElementById("root").classList.remove("blurredAndOverlayed");
      document.getElementById("hell").classList.remove("highlighted");
    }
  }, [browsingPlaylist.expanded]);

  return (
    <>
      {ReactDOM.createPortal(
        <div
          id="hell"
          className={`playlistSidebarContainer ${
            browsingPlaylist.expanded ? "expanded" : ""
          }`}
        >
          <div style={{ position: "relative" }}>
            <Table controls={controls} {...tableFunctions} />
          </div>
        </div>,
        document.getElementById("modal")
      )}
    </>
  );
};

export default PlaylistSidebar;

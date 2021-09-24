import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

import Table from "./Table";
import playButtonThumbnail from "../icons/playButtonThumbnail.svg";
import chevron from "../icons/chevron.png";

import { AudioPlayer } from "./AudioShelf";

const PlaylistSidebar = ({
  tableProps,
  browsingPlaylist,
  closeBrowsingPlaylist,
}) => {
  const [show, setShow] = useState(false);

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
          AudioPlayer.playPlaylist(browsingPlaylist.info);
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
      setShow(true);
      setTimeout(() => {
        document.getElementById("root").classList.add("blurredAndOverlayed");
      }, 600);
    } else if (show) {
      setShow(false);
      document.getElementById("root").classList.remove("blurredAndOverlayed");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [browsingPlaylist.expanded]);

  if (!browsingPlaylist.expanded) {
    return null;
  }

  return (
    <>
      {ReactDOM.createPortal(
        <div
          id="hell"
          className={`playlistSidebarContainer ${show ? "expanded" : ""}`}
        >
          <div style={{ position: "relative" }}>
            <Table controls={controls} {...tableProps} />
          </div>
        </div>,
        document.getElementById("modal")
      )}
    </>
  );
};

export default PlaylistSidebar;

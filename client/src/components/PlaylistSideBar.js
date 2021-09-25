import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

import Table from "./Table";
import playButtonThumbnail from "../icons/playButtonThumbnail.svg";
import chevron from "../icons/chevron.png";

import { addRandomKey } from "../helpers/helpers";
import { getPlaylistItems } from "../apiCalls";

import { AudioPlayer } from "./AudioShelf";
import { notify } from "./Notifications";

export const PlaylistSidebar = {
  browsePlaylist: null,
};

const PlaylistSidebarComponent = () => {
  const [show, setShow] = useState(false);
  const [browsingPlaylist, setBrowsingPlaylist] = useState({
    items: [],
    expanded: false,
  });

  useEffect(() => {
    PlaylistSidebar.browsePlaylist = browsePlaylist;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setBrowsingPlaylist]);

  const browsePlaylist = async (playlist) => {
    try {
      notify("Loading playlist...");
      const playlistItems = await getPlaylistItems(playlist);
      setBrowsingPlaylist({
        items: playlistItems.map(addRandomKey),
        info: playlist,
        expanded: true,
      });
    } catch (e) {
      notify(
        "Something went wrong with trying to fetch information about this playlist."
      );
    }
  };

  const closeBrowsingPlaylist = () => {
    setBrowsingPlaylist((bp) => ({ ...bp, expanded: false }));
  };

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
            <Table
              controls={controls}
              tableTitle={"Playlist: " + browsingPlaylist.info?.title}
              tableArray={browsingPlaylist.items}
            />
          </div>
        </div>,
        document.getElementById("modal")
      )}
    </>
  );
};

export default PlaylistSidebarComponent;

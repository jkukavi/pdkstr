import React, { useEffect, useState } from "react";

import Table from "../Table";

import { addRandomKey } from "../../helpers/helpers";
import { getPlaylistItems } from "../../apiCalls";

import { notify } from "../Notifications";
import Sidebar from "./Sidebar";
import Controls from "./Controls";

export const PlaylistSidebar = {
  browsePlaylist: null,
};

const PlaylistSidebarComponent = () => {
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

  if (!browsingPlaylist.expanded) {
    return null;
  }

  return (
    <>
      <Sidebar closeMe={closeBrowsingPlaylist}>
        <Table
          controls={
            <Controls
              closeBrowsingPlaylist={closeBrowsingPlaylist}
              browsingPlaylist={browsingPlaylist}
            />
          }
          tableTitle={"Playlist: " + browsingPlaylist.info?.title}
          tableArray={browsingPlaylist.items}
        />
      </Sidebar>
    </>
  );
};

export default PlaylistSidebarComponent;

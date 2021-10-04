import React, { useState } from "react";

import { addRandomKey } from "helpers";
import { getPlaylistItems } from "apiCalls";
import useConnectPropsToObserver from "hooks/useConnectPropsToObserver";

import Table from "components/Table";
import { notify } from "components/Notifications";

import Sidebar from "./Sidebar";
import Controls from "./Controls";

export const PlaylistSidebar = {
  setBrowsingPlaylist: null,
  browsePlaylist: async function (playlist) {
    try {
      notify("Loading playlist...");
      const playlistItems = await getPlaylistItems(playlist);
      this.setBrowsingPlaylist({
        items: playlistItems.map(addRandomKey),
        info: playlist,
        expanded: true,
      });
    } catch (e) {
      notify(
        "Something went wrong with trying to fetch information about this playlist."
      );
    }
  },
  closeBrowsingPlaylist: function () {
    this.setBrowsingPlaylist((bp) => ({ ...bp, expanded: false }));
  },
};

const PlaylistSidebarComponent = () => {
  const [browsingPlaylist, setBrowsingPlaylist] = useState({
    items: [],
    expanded: false,
  });

  const props = { setBrowsingPlaylist };
  useConnectPropsToObserver(props, PlaylistSidebar);

  if (!browsingPlaylist.expanded) {
    return null;
  }

  const closeBrowsingPlaylist = () => {
    PlaylistSidebar.closeBrowsingPlaylist();
  };

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

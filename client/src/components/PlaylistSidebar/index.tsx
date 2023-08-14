import React, { useState } from "react";

import { addRandomKey } from "helpers";
import { getPlaylistItems } from "apiCalls";
import useConnectPropsToObserver from "hooks/useConnectPropsToObserver";

import Table from "components/Table";
import { notify } from "components/Notifications";

import Sidebar from "./Sidebar";
import Controls from "./Controls";

export const PlaylistSidebar = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setBrowsingPlaylist: (args: any) => {},
  browsePlaylist: async function (playlist: Playlist) {
    try {
      notify("Loading playlist...");
      const playlistItems = await getPlaylistItems(
        playlist.id,
        playlist.engine
      );
      if (!playlistItems) {
        throw new Error();
      }
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
    this.setBrowsingPlaylist((bp: BrowsingPlaylist) => ({
      ...bp,
      expanded: false,
    }));
  },
};

type BrowsingPlaylist = {
  items: Item[];
  info: Playlist | null;
  expanded: boolean;
};

const PlaylistSidebarComponent = () => {
  const [browsingPlaylist, setBrowsingPlaylist] = useState<BrowsingPlaylist>({
    items: [],
    info: null,
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

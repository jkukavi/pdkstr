import React from "react";
import { ScrollingDownProvider } from "contexts/ScrollingDown";
import { UserDataProvider } from "contexts/UserData";

import BottomMenu from "components/BottomMenu";
import AudioPlayerShelf from "components/AudioShelf";
import PlaylistSidebar from "components/PlaylistSidebar";
import Notifications from "components/Notifications";
import { useLoadAppStateFromSearchQuery } from "hooks/useLoadStateFromQuery";

import Screens from "./Views";

import "./App.css";
import { QueryStringHasChangedProvider } from "helpers/pushToParams";

function App() {
  useLoadAppStateFromSearchQuery();
  return (
    <div className="container">
      <UserDataProvider>
        <QueryStringHasChangedProvider>
          <ScrollingDownProvider>
            <Notifications />
            <Screens />
            <AudioPlayerShelf />
            <PlaylistSidebar />
            <BottomMenu />
          </ScrollingDownProvider>
        </QueryStringHasChangedProvider>
      </UserDataProvider>
    </div>
  );
}

export default App;

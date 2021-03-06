import { ScrollingDownProvider } from "contexts/ScrollingDown";
import { UserDataProvider } from "contexts/UserData";

import BottomMenu from "components/BottomMenu";
import AudioPlayerShelf from "components/AudioShelf";
import PlaylistSidebar from "components/PlaylistSidebar";
import Notifications from "components/Notifications";

import Views from "./Views";

import "./App.css";

function App() {
  return (
    <div className="container">
      <UserDataProvider>
        <ScrollingDownProvider>
          <Notifications />
          <Views />
          <AudioPlayerShelf />
          <PlaylistSidebar />
          <BottomMenu />
        </ScrollingDownProvider>
      </UserDataProvider>
    </div>
  );
}

export default App;

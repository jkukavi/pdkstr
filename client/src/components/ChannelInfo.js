import React, { useState } from "react";

import { buttonTextBySearchEngine } from "../consts";

const ChannelInfo = ({ channelInfo, getChannelItems, getChannelPlaylists }) => {
  const [active, setActive] = useState("items");

  const buttonTexts = buttonTextBySearchEngine[channelInfo.engine];
  return (
    <>
      <div style={{ width: "100%", borderTop: "1px solid #7d7d7d" }}></div>
      <div className="channelInfoContainer">
        <pre style={{ display: "none" }}>
          {JSON.stringify(channelInfo, null, 2)}
        </pre>

        <div className="channelInfo">
          <img
            src={channelInfo.avatars[channelInfo.avatars.length - 1].url}
            alt="alt"
          ></img>
          <p>
            {channelInfo.name}
            <br />
            <span style={{ fontSize: "13px", color: "#989898" }}>
              {channelInfo.subscribers}
            </span>
          </p>
        </div>
        <div
          onClick={() => {
            setActive("items");
            getChannelItems(channelInfo);
          }}
          className={`button ${active === "items" ? "active" : ""}`}
        >
          {buttonTexts.items}
        </div>
        <div
          onClick={() => {
            setActive("playlists");
            getChannelPlaylists(channelInfo);
          }}
          className={`button ${active === "playlists" ? "active" : ""}`}
        >
          {buttonTexts.playlists}
        </div>
      </div>
    </>
  );
};

export default ChannelInfo;

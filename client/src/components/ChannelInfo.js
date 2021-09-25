import React, { useState } from "react";

import { buttonTextBySearchEngine, defaultPuppyImg } from "../consts";
import star from "../icons/star.png";
import trash from "../icons/trash.png";

import { addToFavourites } from "../apiCalls";

const ChannelInfo = ({
  channelInfo,
  loadChannelItems,
  loadChannelPlaylists,
}) => {
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
            src={
              channelInfo.avatars?.[channelInfo.avatars.length - 1].url ||
              defaultPuppyImg
            }
            onError={(e) => {
              e.target.src = trash;
            }}
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
            loadChannelItems(channelInfo);
          }}
          className={`button ${active === "items" ? "active" : ""}`}
        >
          {buttonTexts.items}
        </div>
        <div
          onClick={() => {
            setActive("playlists");
            loadChannelPlaylists(channelInfo);
          }}
          className={`button ${active === "playlists" ? "active" : ""}`}
        >
          {buttonTexts.playlists}
        </div>
        <div
          onClick={() => {
            addToFavourites(channelInfo);
          }}
          className={`button icon`}
        >
          <img src={star} alt="alt"></img>
        </div>
      </div>
    </>
  );
};

export default ChannelInfo;

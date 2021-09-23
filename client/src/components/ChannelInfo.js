import React, { useState } from "react";

import { buttonTextBySearchEngine } from "../consts/index.js";
import star from "../icons/star.png";
import trash from "../icons/trash.png";

const defaultPuppyImg =
  "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=1.00xw:0.669xh;0,0.190xh&resize=1200:*";

const ChannelInfo = ({
  channelInfo,
  getChannelItems,
  getChannelPlaylists,
  addToFavourites,
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

import React, { useEffect, useState } from "react";

import { buttonTextBySearchEngine, defaultPuppyImg } from "consts";
import star from "icons/star.svg";

import {
  addToFavourites,
  getChannelInfo,
  getChannelItems,
  getChannelPlaylists,
} from "apiCalls";
import { SearchBox } from ".";
import { useRouteMatch } from "react-router-dom";
import { notify } from "components/Notifications";
import MicroLoader from "components/Loaders/MicroLoader";

const ChannelInfo = ({
  setSearchArray,
  setArrayLoading,
}: {
  setSearchArray: React.Dispatch<React.SetStateAction<AnyItem[]>>;
  setArrayLoading: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [active, setActive] = useState("items");
  const [channelInfo, setChannelInfo] = useState({} as ChannelInfo);
  const [loading, setLoading] = useState(false);

  const { channelId, engine } = useRouteMatch<{
    channelId: string;
    engine: Engine;
  }>().params;

  const fetchChannelInfo = async () => {
    setLoading(true);
    try {
      const channelInfo = await getChannelInfo(channelId, engine);
      setChannelInfo(channelInfo);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      notify("Something went wrong with fetching channelinfo");
    }
  };

  const fetchChannelItemsOrPlaylists = async () => {
    setArrayLoading(true);
    setSearchArray([]);
    try {
      const fetchCall =
        active === "items" ? getChannelItems : getChannelPlaylists;
      const result = await fetchCall(channelId, engine);
      setSearchArray(result);
    } catch (e) {
      notify("Something wrong with fetching items/playlists.");
    } finally {
      setArrayLoading(false);
    }
  };

  useEffect(() => {
    fetchChannelItemsOrPlaylists();
  }, [active]);

  useEffect(() => {
    fetchChannelInfo();
  }, [channelId]);

  const buttonTexts = buttonTextBySearchEngine["youtube"];
  return (
    <>
      <div style={{ width: "100%", borderTop: "1px solid #7d7d7d" }}></div>
      <div className="channelInfoContainer">
        {loading ? (
          <MicroLoader />
        ) : (
          <div className="channelInfo">
            <img
              src={channelInfo.avatar || defaultPuppyImg}
              onError={(e) => {
                (e.target as HTMLImageElement).src = defaultPuppyImg;
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
        )}
        <div
          onClick={() => {
            setActive("items");
          }}
          className={`button ${active === "items" ? "active" : ""}`}
        >
          {buttonTexts.items}
        </div>
        <div
          onClick={() => {
            setActive("playlists");
          }}
          className={`button ${active === "playlists" ? "active" : ""}`}
        >
          {buttonTexts.playlists}
        </div>
        <div
          // onClick={() => {
          //   addToFavourites({});
          // }}
          className={`button icon`}
        >
          <img src={star} alt="alt"></img>
        </div>
      </div>
    </>
  );
};

export default ChannelInfo;

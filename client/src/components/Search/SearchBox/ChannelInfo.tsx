import React, { useEffect, useState } from "react";
import styled from "styled-components";

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

const ChannelInfoContainer = styled.div`
  margin-top: 0rem;
  height: 2.7rem;
  padding-left: 0.2rem;
  display: flex;
  align-items: center;
  margin-right: 0.1rem;

  & img {
    border-radius: 50%;
    margin-right: 0.5rem;
    height: 2.3rem;
    width: 2.3rem;
  }
`;

const ChannelInfoSubcontainer = styled.div`
  font-size: 13px;
  display: flex;
  align-items: center;
  flex: 0 1 fit-content;
  /* important if we want the text to collapse */
  min-width: 0;
  /* or */
  /* overflow: hidden;, but min-width makes more sense to me */
  &p {
    line-height: 0.9rem;
    color: #d0d0d0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

/* <div className={`searchBoxContainer ${scrollingDown ? "collapsed" : ""}`}>*/
/* ${({ collapsed }) => collapsed && collapsedProps}*/
//className={`button ${active === "items" ? "active" : ""}`}
// className={`button ${active === "playlists" ? "active" : ""}`}

const ChannelButton = styled.div`
  padding: 0 0.5rem 0;
  cursor: pointer;
  color: #c7c7c7;
  transition: color 0.2s;
  margin-left: 0.5rem;
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: center;
  position: relative;
`;

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
    <div>
      <div style={{ width: "100%", borderTop: "1px solid #7d7d7d" }}></div>
      <div className="channelInfoContainer">
        {loading ? (
          <MicroLoader />
        ) : (
          <ChannelInfoSubcontainer /*className="channelInfo"*/>
            <img
              src={channelInfo.avatar || defaultPuppyImg}
              onError={(e) => {
                (e.target as HTMLImageElement).src = defaultPuppyImg;
              }}
              alt="alt"
              style={{
                borderRadius: "50%",
                marginRight: "0.5rem",
                height: "2.3rem",
                width: " 2.3rem",
              }}
            ></img>
            <p>
              {channelInfo.name}
              <br />
              <span style={{ fontSize: "13px", color: "#989898" }}>
                {channelInfo.subscribers}
              </span>
            </p>
          </ChannelInfoSubcontainer>
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
    </div>
  );
};

export default ChannelInfo;

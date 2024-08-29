import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";

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
import { isTemplateSpan } from "typescript";

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
  min-width: 0;

  & p {
    line-height: 0.9rem;
    color: ${({ theme }) => theme.channelInfo.textColor};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const activeProps = css`
  color: ${({ theme }) => theme.channelInfo.activeColor};
  text-decoration: underline;
  text-underline-offset: 3px;
`;

const Button = styled.div`
  padding: 0 0.5rem 0;
  cursor: pointer;
  color: ${({ theme }) => theme.channelInfo.buttonTextColor};
  transition: color 0.2s;
  margin-left: 0.5rem;
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: center;
  position: relative;

  &:hover {
    color: ${({ theme }) => theme.channelInfo.hoverColor};
  }

  &:after {
    content: "";
    position: absolute;
    width: 100%;
    height: 1px;
    background-color: transparent;
    transition: background-color 0.2s;
    bottom: 0;
  }

  &:hover::after {
    content: "";
    width: 100%;
    height: 1px;
    background-color: ${({ theme }) => theme.channelInfo.hoverColor};
    position: absolute;
    bottom: 0;
  }

  & img {
    filter: invert(0.7);
    height: 24px;
    width: 24px;
  }
`;

const ChannelButton = styled(Button)<{ active: string }>`
  ${({ active }) => active && activeProps};
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
      <ChannelInfoContainer>
        {loading ? (
          <MicroLoader />
        ) : (
          <ChannelInfoSubcontainer>
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
          </ChannelInfoSubcontainer>
        )}
        <ChannelButton
          onClick={() => {
            setActive("items");
          }}
          active={active === "items" ? "active" : ""}
        >
          {buttonTexts.items}
        </ChannelButton>

        <ChannelButton
          onClick={() => {
            setActive("playlists");
          }}
          active={active === "playlists" ? "active" : ""}
        >
          {buttonTexts.playlists}
        </ChannelButton>
        <Button>
          <img src={star} alt="alt"></img>
        </Button>
      </ChannelInfoContainer>
    </div>
  );
};

export default ChannelInfo;

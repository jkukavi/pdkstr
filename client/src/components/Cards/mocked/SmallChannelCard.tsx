import React from "react";
import cardTypesBySize from "../cardTypesBySize";
import styled from "styled-components";
import star from "icons/star.svg";
import externalLink from "icons/externalLink.svg";

const props = {
  type: "channel",
  name: "Yeat Music",
  channelID: "UCV4UK9LNNLViFP4qZA_Wmfw",
  url: "https://www.youtube.com/@yeatmusic3280",
  bestAvatar: {
    url: "https://yt3.googleusercontent.com/ytc/AIdro_moppdFS0Dbz9Jc0L7_PHu2xKtFuAHoRU1Yt2xPEipZ0kw=s176-c-k-c0x00ffffff-no-rj-mo",
    width: 176,
    height: 176,
  },
  avatars: [
    {
      url: "https://yt3.googleusercontent.com/ytc/AIdro_moppdFS0Dbz9Jc0L7_PHu2xKtFuAHoRU1Yt2xPEipZ0kw=s176-c-k-c0x00ffffff-no-rj-mo",
      width: 176,
      height: 176,
    },
    {
      url: "https://yt3.googleusercontent.com/ytc/AIdro_moppdFS0Dbz9Jc0L7_PHu2xKtFuAHoRU1Yt2xPEipZ0kw=s88-c-k-c0x00ffffff-no-rj-mo",
      width: 88,
      height: 88,
    },
  ],
  verified: true,
  subscribers: "@yeatmusic3280",
  descriptionShort: "Yeat Instagram - Yeat All Music Platforms - Yeat.",
  videos: 126,
  engine: "youtube",
};

type ChannelItem = typeof props;

const Container = styled.div`
  width: 400px;
  height: 200px;
  padding: 12px;
  gap: 12px;
  background-color: #c7c7c7;
  border: 1px solid black;
  border: 1px solid black;
  border-radius: 8px;
  display: flex;
  overflow: hidden;

  & > :nth-child(1) {
    flex-grow: 1;
  }

  & > :nth-child(2) {
    width: 50%;
  }
`;

const LeftSideContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const RightSideContainer = styled.div``;

const Img = styled.img`
  border-radius: 50%;
  max-width: 100%;
  max-height: 100%;
  cursor: pointer;
`;

const onClick = () => {
  alert("Hello");
};

const iconSize = 40;

const IconContainer = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: yellowgreen;
  width: ${iconSize}px;
  height: ${iconSize}px;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.5s;

  &:hover {
    background-color: red;
  }

  & img {
    width: 80%;
    height: 80%;
  }
`;

const IconsContainer = styled.div`
  display: flex;
  gap: 4px;
`;

type SmallChannelCardProps = {
  item: ChannelItem;
  goToChannel: () => void;
  addToFavourites: () => void;
};

const SmallCard = ({
  item,
  goToChannel,
  addToFavourites,
}: SmallChannelCardProps) => {
  return (
    <Container>
      <LeftSideContainer>
        <Img src={item.bestAvatar.url} onClick={goToChannel}></Img>
      </LeftSideContainer>
      <RightSideContainer>
        <div style={{ width: "100%" }}>
          <h1>{item.name}</h1>
          <p style={{ fontSize: "12px" }}>{item.descriptionShort}</p>
          <p style={{ fontSize: "12px" }}>{item.videos} videos</p>
        </div>
        <IconsContainer>
          <Icon src={star} onClick={addToFavourites} />
          <Icon src={externalLink} onClick={addToFavourites} />
        </IconsContainer>
      </RightSideContainer>
    </Container>
  );
};

type PropsType = {
  onClick: () => void;
  src: string;
};

const Icon = ({ onClick, src }: PropsType) => {
  return (
    <IconContainer onClick={onClick}>
      <img src={src}></img>
    </IconContainer>
  );
};

const SmallChannelCard = () => {
  return (
    <SmallCard
      item={props}
      goToChannel={() => {
        alert("Go to channel!");
      }}
      addToFavourites={() => {
        alert("Add to favourites!");
      }}
    />
  );
};

export default SmallChannelCard;

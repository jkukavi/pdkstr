import React from "react";
import cardTypesBySize from "../cardTypesBySize";

const SmallCard = cardTypesBySize.small.channel;

const props = {
  type: "channel",
  name: "Yeat Music",
  channelID: "UCV4UK9LNNLViFP4qZA_Wmfw",
  url: "https://www.youtube.com/@yeatmusic3280",
  bestAvatar: {
    url: "https://yt3.googleusercontent.com/ytc/AIf8zZRPoFR6foqa8mc8sshjAGwvX8an6ZLmGBf_m3mh_Q=s176-c-k-c0x00ffffff-no-rj-mo",
    width: 176,
    height: 176,
  },
  avatars: [
    {
      url: "https://yt3.googleusercontent.com/ytc/AIf8zZRPoFR6foqa8mc8sshjAGwvX8an6ZLmGBf_m3mh_Q=s176-c-k-c0x00ffffff-no-rj-mo",
      width: 176,
      height: 176,
    },
    {
      url: "https://yt3.googleusercontent.com/ytc/AIf8zZRPoFR6foqa8mc8sshjAGwvX8an6ZLmGBf_m3mh_Q=s88-c-k-c0x00ffffff-no-rj-mo",
      width: 88,
      height: 88,
    },
  ],
  verified: true,
  subscribers: "@yeatmusic3280",
  descriptionShort: "Yeat Instagram - Yeat All Music Platforms - Yeat.",
  videos: 971,
  engine: "youtube",
  key: "5a6645e5-7d29-48d1-a78d-cc7c1d905f13",
} as const;

const SmallChannelCard = () => {
  return <SmallCard channelClickAction={() => {}} item={props} />;
};

export default SmallChannelCard;

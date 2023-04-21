import React from "react";

import { allowedCardTypes } from "consts";

import { SearchBox } from "components/Search/SearchBox";
import cardTypes from "./cardTypes";
import Loader from "components/Loaders/Loader";

interface CardProps {
  searchArray: (Item | Playlist | Channel)[];
  arrayLoading?: boolean;
  channelClickAction?: VoidFunction;
}

const Cards = ({
  searchArray,
  arrayLoading,
  channelClickAction,
}: CardProps) => {
  const { viewingChannel } = SearchBox;

  const cards = searchArray
    .filter(({ type }) => allowedCardTypes.includes(type))
    .map((item, i) => {
      const CardComponent = cardTypes[item.type] as (props: any) => JSX.Element;

      const cardProps = {
        viewingChannel,
        item,
        channelClickAction,
      };

      return <CardComponent {...cardProps} key={i} />;
    });

  return (
    <div
      id="cardContainer"
      className={`cardContainer ${viewingChannel ? "expanded" : ""}`}
    >
      {arrayLoading && <Loader />}
      {searchArray && cards}
    </div>
  );
};

export default Cards;

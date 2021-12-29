import React, { useMemo } from "react";

import { allowedCardTypes } from "consts";

import { SearchBox } from "components/Search/SearchBox";
import Loader from "components/Loader";

import cardTypes from "./cardTypes";

interface CardProps {
  searchArray: (Item | Playlist | Channel)[];
  arrayLoading: boolean;
  channelClickAction: VoidFunction;
}

const Cards = ({
  searchArray,
  arrayLoading,
  channelClickAction,
}: CardProps) => {
  const { viewingChannel } = SearchBox;

  const cards = useMemo(() => {
    return searchArray
      .filter(({ type }) => allowedCardTypes.includes(type))
      .map((item) => {
        const CardComponent = cardTypes[item.type] as (
          props: any
        ) => JSX.Element;

        const cardProps = {
          viewingChannel,
          item,
          channelClickAction,
        };

        return <CardComponent {...cardProps} />;
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchArray]);

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

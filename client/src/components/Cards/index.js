import React, { useMemo } from "react";

import { allowedCardTypes } from "../../consts";

import { SearchBox } from "../Search/SearchBox";
import cardTypes from "./cardTypes";

import Loader from "../Loader";

const Cards = ({ searchArray, arrayLoading, channelClickAction }) => {
  const { viewingChannel } = SearchBox;

  const cards = useMemo(() => {
    return searchArray
      .filter(({ type }) => allowedCardTypes.includes(type))
      .map((item) => {
        const CardComponent = cardTypes[item.type];
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

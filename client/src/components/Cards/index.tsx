import React, { useEffect, useRef } from "react";

import { allowedCardTypes } from "consts";

import { SearchBox } from "components/Search/SearchBox";
import cardTypes from "./cardTypes";
import Loader from "components/Loaders/Loader";

interface CardProps {
  searchArray: (Item | Playlist | Channel)[];
  loading?: boolean;
  channelClickAction?: VoidFunction;
  onBottomReached?: () => void;
}

const detectBottomReached = (element: HTMLElement, callback: () => void) => {
  const handleScroll = () => {
    const { scrollHeight, scrollTop, clientHeight } = element;

    const bottomReached = scrollTop + clientHeight >= scrollHeight;

    if (bottomReached) {
      // User has scrolled to the bottom of the scrollableDiv, load more results
      callback();
    }
  };

  element.addEventListener("scroll", handleScroll);

  // Clean up function
  return () => {
    element.removeEventListener("scroll", handleScroll);
  };
};

const Cards = ({
  searchArray,
  loading,
  channelClickAction,
  onBottomReached,
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

  const scrollableDivRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollableDivRef.current) {
      const cleanup = detectBottomReached(scrollableDivRef.current, () => {
        onBottomReached?.();
        console.log("Bottom of scrollable div reached!");
      });
      return cleanup;
    }
  }, []);

  return (
    <div
      id="cardContainer"
      className={`cardContainer ${viewingChannel ? "expanded" : ""}`}
      ref={scrollableDivRef}
    >
      {searchArray && cards}
      {loading && <Loader />}
    </div>
  );
};

export default Cards;

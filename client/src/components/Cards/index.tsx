import React, { useEffect, useRef } from "react";
import { theme } from "consts/theme";

import { allowedCardTypes } from "consts";

import { SearchBox } from "components/Search/SearchBox";
import cardTypesBySize from "./cardTypesBySize";
//import Loader from "components/Loaders/Loader";
//import Loaders from "components/Loaders";
import { Route, Switch } from "react-router-dom";
import useLocalStorage from "hooks/useLocalStorage";
import SpinningLoader from "components/Loaders";

interface CardProps {
  searchArray: (Item | Playlist | Channel)[];
  loading?: boolean;
  channelClickAction?: VoidFunction;
  onBottomReached?: () => void;
}

const detectBottomReached = (element: HTMLElement, callback: () => void) => {
  const handleScroll = () => {
    const { scrollHeight, scrollTop, clientHeight } = element;

    const bottomReached = scrollTop + clientHeight >= scrollHeight - 10;

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

  const cardSize = useLocalStorage("cSize") as "large" | "small";

  const cardTypes = cardTypesBySize[cardSize || "large"];

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
    <>
      <Switch>
        <Route path={"/channel"}>
          <div style={{ height: 44 }} />
        </Route>
      </Switch>
      <div
        id="cardContainer"
        className={`cardContainer ${viewingChannel ? "expanded" : ""}`}
        ref={scrollableDivRef}
      >
        {searchArray && cards}
        {loading && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "3rem",
              margin: "auto",
            }}
          >
            <SpinningLoader
              sizeInPx={300}
              color={theme.loaders.otherBorderColor}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default Cards;

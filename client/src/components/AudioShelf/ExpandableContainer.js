import React, { useState, useEffect } from "react";

import playingQueue from "../../icons/playingQueue.png";
import chevron from "../../icons/chevron.png";

import { useScrollingDownContext } from "../../contexts/ScrollingDown";
import { PlayingQueue } from "./PlayingQueue";

const Container = {
  expanded: false,
  toggleExpanded: null,
};

const ExpandableContainer = ({ isPlayerActive, children }) => {
  const scrollingDown = useScrollingDownContext("cardContainer");
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded((e) => {
      Container.expanded = !e;
      return !e;
    });
  };

  useEffect(() => {
    Container.toggleExpanded = toggleExpanded;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setExpanded]);

  const shouldBeOpened = isPlayerActive && !scrollingDown;

  return (
    <div
      className={`audioShelf ${shouldBeOpened ? "" : "closed"} ${
        expanded ? "opened" : ""
      }`}
    >
      {children}
    </div>
  );
};

export default ExpandableContainer;

export const ExpandButton = () => {
  const [show, setShow] = useState(!!PlayingQueue.playlist.length);
  const [localExpanded, setLocalExpanded] = useState(Container.expanded);

  useEffect(() => {
    PlayingQueue.notify = () => {
      setShow(!!PlayingQueue.playlist.length);
    };
  }, [setShow]);

  const toggleExpanded = () => {
    setLocalExpanded((e) => !e);
    Container.toggleExpanded();
  };

  if (!show) return null;

  return (
    <>
      <div style={{ borderLeft: "1px solid black" }}></div>
      <div
        className={`audioButton close ${localExpanded ? "expanded" : ""}`}
        onClick={toggleExpanded}
      >
        <img src={localExpanded ? chevron : playingQueue} alt="loading" />
      </div>
    </>
  );
};

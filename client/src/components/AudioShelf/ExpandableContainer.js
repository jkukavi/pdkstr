import React, { useState, useEffect } from "react";

import playingQueue from "../../icons/playingQueue.png";
import chevron from "../../icons/chevron.png";

import { useScrollingDownContext } from "../../contexts/ScrollingDown";

const Container = {
  expanded: false,
  toggleExpanded: null,
};

const ExpandableContainer = ({ directUrl, audioLoading, children }) => {
  const scrollingDown = useScrollingDownContext("cardContainer");
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded((e) => !e);
    Container.expanded = !expanded;
  };

  useEffect(() => {
    Container.toggleExpanded = toggleExpanded;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setExpanded]);

  const shouldBeClosed = (directUrl || audioLoading) && !scrollingDown;

  return (
    <div
      className={`audioShelf ${shouldBeClosed ? "" : "closed"} ${
        expanded ? "opened" : ""
      }`}
    >
      {children}
    </div>
  );
};

export default ExpandableContainer;

export const ExpandButton = () => {
  const [localExpanded, setLocalExpanded] = useState(Container.expanded);

  const toggleExpanded = () => {
    setLocalExpanded((e) => !e);
    Container.toggleExpanded();
  };

  return (
    <div
      className={`audioButton close ${localExpanded ? "expanded" : ""}`}
      onClick={toggleExpanded}
    >
      <img src={localExpanded ? chevron : playingQueue} alt="loading" />
    </div>
  );
};

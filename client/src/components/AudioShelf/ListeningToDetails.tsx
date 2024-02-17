import React from "react";
import { useObservePlayer } from "./Player";
import cardTypesBySize from "components/Cards/cardTypesBySize";

const SmallItemCard = cardTypesBySize.small.item;

const ListeningToDetails = () => {
  const { listeningTo } = useObservePlayer();

  if (!listeningTo) {
    return <></>;
  }

  return <SmallItemCard item={listeningTo} translucent={true} />;
};

export { ListeningToDetails };

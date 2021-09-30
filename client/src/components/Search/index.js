import React, { useState } from "react";

import SearchBox from "./SearchBox";
import Cards from "../Cards";

//used to load page from channel view -- problem: unable to recreate channelinfo from only channel ID.
// useEffect(() => {
//   //this will be used
//   const queryString = qs.parse(location.search);
//   if (queryString.channel) {
//     const [engineShortcut, channelId] = queryString.channel.split(".");
//     const engine = searchEnginesByShortcut[engineShortcut];
//     loadChannelItemsFromId(channelId, engine);
//   }
//   // eslint-disable-next-line react-hooks/exhaustive-deps
// }, []);

// const loadChannelItemsFromId = async (channelId, engine) => {
//   try {
//     const { channelInfo, searchResultsArray } = await getChannelItemsFromId(
//       channelId,
//       engine
//     );
//     setViewingChannel(channelInfo);
//     setSearchArray(searchResultsArray);
//   } catch (e) {
//     notify("Unable to fetch channel data.");
//   } finally {
//     setArrayLoading(false);
//   }
// };

const Search = () => {
  const [searchArray, setSearchArray] = useState([]);
  const [arrayLoading, setArrayLoading] = useState(false);

  return (
    <>
      <SearchBox
        setSearchArray={setSearchArray}
        setArrayLoading={setArrayLoading}
      />
      <Cards
        searchArray={searchArray}
        arrayLoading={arrayLoading}
        //to implement via Observer
        viewingChannel={false}
        loadChannelItems={() => {}}
      />
    </>
  );
};

export default Search;

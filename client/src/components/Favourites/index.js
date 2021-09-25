import React, { useState, useCallback, useEffect, useMemo } from "react";

import { useHistory } from "react-router";

import { debounce } from "../../helpers/helpers";
import magnifier from "../../icons/magnifier.png";
import closeIcon from "../../icons/close.png";
import FilterDropdown from "./FilterDropdown";

import Cards from "../../components/Cards";
import { useUserData } from "../../contexts/UserData";

const filters = {
  TRACKS: "video",
  PLAYLISTS: "playlist",
  CHANNELS: "channel",
};

const Favourites = () => {
  const history = useHistory();

  const { favourites, loadFavourites } = useUserData();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(loadFavourites, []);

  const [inputDroppedDown, setInputDroppedDown] = useState(false);
  const [filter, setFilter] = useState(filters.TRACKS);
  const [queryString, setQueryString] = useState(null);
  const [inputString, setInputString] = useState("");

  const onInputChange = (e) => {
    const newString = e.target.value;
    if (inputString === "" && newString !== "") setInputDroppedDown(true);
    e.preventDefault();
    setInputString(newString);
    debouncedSetQueryString(newString);
  };

  const filteredItems = useMemo(() => {
    const favouriteItems = (favourites || []).filter(
      (item) => item.type === filter
    );
    const queriedItems = queryString
      ? favouriteItems.filter((item) =>
          item.title?.toLowerCase().includes(queryString.toLowerCase())
        )
      : favouriteItems;
    return queriedItems;
  }, [favourites, queryString, filter]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSetQueryString = useCallback(debounce(setQueryString, 500), [
    setQueryString,
  ]);

  const inputDropdown = {
    open: () => {
      setInputDroppedDown(true);
    },
    close: () => {
      setInputDroppedDown(false);
      setQueryString(null);
      setInputString("");
    },
  };

  const dropdownProps = {
    filter,
    filters,
    setFilter,
  };

  const inputProps = {
    value: inputString,
    type: "text",
    placeholder: "Filter favourites",
    onChange: onInputChange,
  };

  return (
    <>
      <div className="filterNavbarContainer">
        <div style={{ padding: 0 }} className="filterNavbar">
          <h2 style={{ paddingLeft: "0.3rem" }}>Favourites</h2>
          <div className="verticalLine"></div>

          <div className="toggle720">
            <FilterDropdown {...dropdownProps} />
            <div style={{ display: "inherit" }}>
              <div
                className={`button ${
                  filter === filters.TRACKS ? "active" : ""
                }`}
                onClick={() => {
                  setFilter(filters.TRACKS);
                }}
              >
                Tracks
              </div>
              <div
                className={`button ${
                  filter === filters.PLAYLISTS ? "active" : ""
                }`}
                onClick={() => {
                  setFilter(filters.PLAYLISTS);
                }}
              >
                Playlists
              </div>
              <div
                className={`button ${
                  filter === filters.CHANNELS ? "active" : ""
                }`}
                onClick={() => {
                  setFilter(filters.CHANNELS);
                }}
              >
                Channels
              </div>
            </div>
          </div>
          <div className="verticalLine"></div>

          <div className="toggle720">
            <div>
              <div onClick={inputDropdown.open} className="iconHolder">
                <img src={magnifier} alt="alt" />
              </div>
              <div
                className={`inputContainer ${
                  inputDroppedDown ? "droppedDown" : ""
                }`}
              >
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    height: "85%",
                    padding: "0 0.3rem 0",
                  }}
                >
                  <input
                    style={{
                      fontSize: "1.1rem",
                      width: "100%",
                      height: "100%",
                    }}
                    {...inputProps}
                  />
                  <div
                    onClick={inputDropdown.close}
                    style={{
                      position: "absolute",
                      top: 0,
                      right: "10px",
                      height: "100%",
                      width: "1.4rem",
                      background: `url(${closeIcon}) center center / contain no-repeat`,
                      filter: "invert(0.6)",
                    }}
                  />
                </div>
              </div>
            </div>
            <div style={{ display: "inherit" }}>
              <input style={{ margin: "3px 0 3px" }} {...inputProps} />
              <div className="iconHolder">
                <img src={magnifier} alt="alt" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Cards
        searchArray={filteredItems}
        channelClickAction={() => {
          history.push("/");
        }}
      />
    </>
  );
};

export default Favourites;

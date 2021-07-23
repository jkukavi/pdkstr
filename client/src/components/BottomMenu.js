import React from "react";

import { menu } from "../consts";

const BottomMenu = ({
  page,
  setPage,
  listHistory,
  history,
  magnifier,
  library,
}) => {
  return (
    <div className="bottomMenu">
      <div
        className={`icon ${page === menu.HISTORY ? "active" : ""}`}
        onClick={() => {
          listHistory();
          setPage(menu.HISTORY);
        }}
      >
        <img src={history} alt="alt"></img>
      </div>
      <div
        className={`icon ${page === menu.SEARCH ? "active" : ""}`}
        onClick={() => {
          setPage(menu.SEARCH);
        }}
      >
        <img src={magnifier} alt="alt"></img>
      </div>
      <div
        className={`icon ${page === menu.LIBRARY ? "active" : ""}`}
        onClick={() => {
          setPage(menu.LIBRARY);
        }}
      >
        <img src={library} alt="alt"></img>
      </div>
    </div>
  );
};

export default BottomMenu;

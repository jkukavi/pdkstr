import React from "react";

import playButton from "../icons/playButton.png";
import trash from "../icons/trash.png";
import { SearchEngineIcon } from "../consts/index.js";

const Table = ({
  tableTitle,
  notify,
  deleteAll,
  tableArray,
  listeningTo,
  controls,
  activeVideo,
  getDirectUrl,
  setActiveVideo,
  setListeningTo,
  getViewsString,
}) => {
  return (
    <table id="customers">
      <thead>
        {controls && (
          <tr>
            <th colSpan={2}>
              <div className="indexContainer">{controls}</div>
            </th>
          </tr>
        )}

        <tr>
          <th colSpan={2}>
            <div className="indexContainer">
              <span>{tableTitle}</span>
              <div className={"playlist icons"}>
                <div className={"icon"} onClick={deleteAll}>
                  <img src={trash} alt="alt"></img>
                </div>
              </div>
            </div>
          </th>
        </tr>
        <tr>
          <th>
            <div className="indexContainer">
              <span>{"#"}</span>
            </div>
          </th>
          <th>
            <p>{"Title & metadata"}</p>
          </th>
        </tr>
      </thead>
      <tbody>
        {tableArray?.map((video, index) => (
          <tr
            className={`${listeningTo?.title === video.title ? "active" : ""}`}
            onClick={() => {
              getDirectUrl(video);
              setActiveVideo(index);
              setListeningTo(video);
              notify(`Listening to: ${video.title}`);
            }}
          >
            <td>
              <div className="indexContainer">
                <span className="index">{index}</span>
                <div className="playButton">
                  <span>
                    <img src={playButton} alt="X" />
                  </span>
                </div>
              </div>
            </td>
            <td>
              <div className="tableRowInfo">
                <div className={"playlist title"}>
                  <p>
                    <SearchEngineIcon engine={video.engine} />
                    {video.title}
                  </p>
                </div>
                <div className={"playlist metadata"}>
                  <p>{video.author?.name}</p>•
                  <p>{getViewsString?.(video.views) || "N/A"}</p>•
                  <p>{video.duration}</p>•<p>{video.uploadedAt}</p>
                </div>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;

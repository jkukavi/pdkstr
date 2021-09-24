import React, { useState, useEffect } from "react";

import playButton from "../icons/playButton.png";

import { getViewsString } from "../helpers/helpers";

import { SearchEngineIcon } from "../consts/index.js";
import { AudioPlayer } from "./AudioShelf";

const Table = ({ tableTitle, notify, tableArray, controls }) => {
  const [listeningTo, setListeningTo] = useState(
    null || AudioPlayer.listeningTo
  );

  useEffect(() => {
    console.log("subskribe");
    const id = AudioPlayer.subscribe(setListeningTo);

    return () => {
      AudioPlayer.unsubscribe(id);
      console.log("unsubkribe");
    };
  }, [setListeningTo]);

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
            key={video.key}
            className={`${listeningTo?.id === video.id ? "active" : ""}`}
            onClick={() => {
              AudioPlayer.getDirectUrl(video);
              AudioPlayer.setActiveVideo(index);
              AudioPlayer.setListeningTo(video);
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

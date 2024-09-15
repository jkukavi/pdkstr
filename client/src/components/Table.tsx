import React, { useState, useEffect } from "react";

import { getViewsString } from "helpers";
import { SearchEngineIcon } from "consts";

import playButton from "icons/play.svg";

import { Player as AudioPlayer } from "components/AudioShelf/Player";
import styled from "styled-components";

const TableMain = styled.table`
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100vw;
  background: ${({ theme }) => theme.table.container.backgroundColor};
  box-shadow: 2px 2px 1px 0px ${({ theme }) => theme.table.container.boxShadow};
  color: ${({ theme }) => theme.table.container.color};

  td,
  th {
    border: 1px solid ${({ theme }) => theme.table.td_th.border};
    padding: 8px;
    position: relative;
  }

  th {
    padding-top: 12px;
    padding-bottom: 12px;
    text-align: left;
  }

  p {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin: 0;
  }
  tbody tr {
    cursor: pointer;
    transition: background-color 0.1s;
  }
`;

const IndexStyle = styled.span`
  text-align: center;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

const IndexContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
`;

const PlayButton = styled.div`
  opacity: 0;
  position: relative;
  height: 20px;
  width: 20px;

  img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
  }
`;

const TableRowInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 76vw;
`;

const Table = ({
  tableTitle,
  tableArray,
  controls,
}: {
  tableTitle: string;
  tableArray: Item[];
  controls?: React.ReactNode;
}) => {
  const [listeningTo, setListeningTo] = useState<Item | null>(
    null || AudioPlayer.listeningTo
  );

  const updateListeningTo = ({ listeningTo }: { listeningTo: Item | null }) => {
    setListeningTo(listeningTo);
  };

  useEffect(() => {
    const id = AudioPlayer.subscribe(updateListeningTo);

    return () => {
      AudioPlayer.unsubscribe(id);
    };
  }, [setListeningTo]);

  return (
    <TableMain>
      <thead>
        {controls && (
          <tr>
            <th colSpan={2}>
              <IndexContainer>{controls}</IndexContainer>
            </th>
          </tr>
        )}

        <tr>
          <th colSpan={2}>
            <IndexContainer>
              <span>{tableTitle}</span>
            </IndexContainer>
          </th>
        </tr>
        <tr>
          <th>
            <IndexContainer>
              <span>{"#"}</span>
            </IndexContainer>
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
              AudioPlayer.playItem(video);
            }}
          >
            <td>
              <IndexContainer>
                <IndexStyle>{index}</IndexStyle>
                <PlayButton>
                  <span>
                    <img src={playButton} alt="X" />
                  </span>
                </PlayButton>
              </IndexContainer>
            </td>
            <td>
              <TableRowInfo>
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
              </TableRowInfo>
            </td>
          </tr>
        ))}
      </tbody>
    </TableMain>
  );
};

export default Table;

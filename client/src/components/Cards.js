import React, { useEffect } from "react";

import playingQueue from "../icons/playingQueue.png";
import browseList from "../icons/browseList.png";
import star from "../icons/star.png";
import playButtonThumbnail from "../icons/playButtonThumbnail.svg";
import { SearchEngineIcon } from "../consts/index.js";

import { throttle, checkScroll, getViewsString } from "../helpers/helpers";

const defaultPuppyImg =
  "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=1.00xw:0.669xh;0,0.190xh&resize=1200:*";

const allowedTypes = ["video", "playlist", "channel"];

const Cards = ({
  arrayLoading,
  searchArray,
  viewingChannel,
  getDirectUrl,
  getChannelItems,
  playPlaylist,
  browsePlaylist,
  setActiveVideo,
  setListeningTo,
  setScrollingDown,
  addToHistory,
  addToFavourites,
  notify,
  addToQueue,
  channelClickAction,
}) => {
  useEffect(() => {
    document
      .getElementById("cardContainer")
      .addEventListener("scroll", throttle(checkScroll(setScrollingDown), 500));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      id="cardContainer"
      className={`cardContainer ${!!viewingChannel ? "expanded" : ""}`}
    >
      {arrayLoading && (
        <div className="loading array">
          <div className="loader" />
        </div>
      )}
      {searchArray
        .filter(({ type }) => allowedTypes.includes(type))
        .map((item, i) => {
          const {
            title,
            thumbnails,
            duration,
            uploadedAt,
            author,
            views,
            type,
            bestAvatar,
            name,
            subscribers,
            key,
          } = item;

          if (type === "video") {
            return (
              <div className="card" key={key}>
                <div
                  onClick={() => {
                    getDirectUrl(item);
                    setActiveVideo(null);
                    setListeningTo(item);
                    addToHistory(item);
                    notify(`Listening to: ${item.title}`);
                  }}
                  className="thumbnail"
                >
                  <div className="overlay">
                    <div
                      style={{
                        position: "absolute",
                        zIndex: 3,
                        right: "5px",
                        bottom: "5px",
                      }}
                    >
                      <SearchEngineIcon engine={item.engine} size={"m"} />
                    </div>
                    <img
                      className="image"
                      src={
                        thumbnails
                          ? thumbnails[thumbnails.length - 1]?.url
                          : defaultPuppyImg
                      }
                      alt="alt"
                    ></img>
                  </div>

                  <img
                    src={playButtonThumbnail}
                    className="playButton"
                    alt="alt"
                  />
                </div>
                <div className="descContainer">
                  <p className="desc title">
                    {`${title?.substring(0, 45)}${
                      title?.length > 45 ? "..." : ""
                    }`}
                  </p>

                  <>
                    <div className="channelDescAndPlaylist">
                      {!viewingChannel && (
                        <div className="channelDesc">
                          <div
                            className="authorThumbnail"
                            onClick={(event) => {
                              getChannelItems(item);
                            }}
                            style={{
                              backgroundImage: `url(${
                                author?.avatars
                                  ? author.avatars[author.avatars.length - 1]
                                      ?.url
                                  : defaultPuppyImg
                              })`,
                            }}
                          />
                          <div className="desc channelName">
                            <p>{author?.name || "Name not found"}</p>
                          </div>
                        </div>
                      )}
                      <div style={{ display: "flex" }}>
                        <div
                          className="addToPlaylistIcon"
                          onClick={() => {
                            addToQueue(item);
                          }}
                        >
                          <img src={playingQueue} alt="loading"></img>
                        </div>
                        <div
                          className="addToPlaylistIcon"
                          onClick={() => {
                            addToFavourites(item);
                          }}
                        >
                          <img src={star} alt="loading"></img>
                        </div>
                      </div>
                    </div>

                    <div className="metadata">
                      {!viewingChannel && (
                        <>
                          <p className="desc">
                            {views
                              ? `${getViewsString(views)} views`
                              : "Views not available"}
                          </p>
                          •
                        </>
                      )}
                      <p className="desc">
                        {duration || "Duration not available"}
                      </p>

                      {!viewingChannel && (
                        <>
                          •
                          <p className="desc">
                            {uploadedAt || "Uploaded date not available"}
                          </p>
                        </>
                      )}
                    </div>
                  </>
                </div>
              </div>
            );
          }

          if (type === "channel") {
            return (
              <div className="card channel" key={key}>
                <p style={{ height: "0.4rem" }} className="desc title">
                  CHANNEL
                </p>
                <div
                  className="thumbnail"
                  onClick={() => {
                    getChannelItems(item);
                    if (channelClickAction) channelClickAction();
                  }}
                >
                  <img
                    src={bestAvatar.url || defaultPuppyImg}
                    className="thumbnail"
                    alt="thumbnail"
                  />
                </div>
                <div className="descContainer">
                  <div className="flex">
                    <div>
                      <p style={{ height: "2rem" }} className="desc title">
                        {name}
                      </p>
                      <p className="desc">
                        {subscribers || "Subscribers not available"}
                      </p>
                    </div>
                    <div
                      className="addToPlaylistIcon playlist"
                      onClick={() => {
                        addToFavourites(item);
                      }}
                    >
                      <img src={star} alt="loading"></img>
                    </div>
                  </div>
                </div>
              </div>
            );
          }

          if (type === "playlist") {
            return (
              <div className="card playlist" key={key}>
                <p style={{ height: "1rem" }} className="desc title">
                  PLAYLIST
                </p>
                <div
                  onClick={() => {
                    playPlaylist(item);
                  }}
                  className="thumbnail"
                  style={{
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                  }}
                >
                  <div className="overlay">
                    <div
                      style={{
                        position: "absolute",
                        zIndex: 3,
                        right: "5px",
                        bottom: "5px",
                      }}
                    >
                      <SearchEngineIcon engine={item.engine} size={"m"} />
                    </div>
                    <img
                      className="image"
                      src={
                        thumbnails
                          ? thumbnails[thumbnails.length - 1]?.url
                          : defaultPuppyImg
                      }
                      alt="alt"
                    ></img>
                  </div>
                  <div
                    style={{
                      filter: "drop-shadow(2px 4px 3px black",
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      zIndex: 3,
                    }}
                  >
                    <img
                      src={playingQueue}
                      style={{ filter: "invert(1)" }}
                      className="playButton"
                      alt="alt"
                    />
                  </div>
                </div>
                <div className="descContainer">
                  <div style={{ display: "flex", margin: "0.5rem 0px" }}>
                    <div
                      className="addToPlaylistIcon playlist"
                      onClick={() => {
                        browsePlaylist(item);
                      }}
                    >
                      <img src={browseList} alt="loading"></img>
                    </div>
                    <div
                      className="addToPlaylistIcon playlist"
                      onClick={() => {
                        addToFavourites(item);
                      }}
                    >
                      <img src={star} alt="loading"></img>
                    </div>
                  </div>
                  <p
                    className="desc title singleLineText"
                    style={{ marginTop: 0 }}
                  >
                    <span>{title}</span>
                    <br />
                    <span style={{ fontSize: "12px", fontWeight: "normal" }}>
                      {item.length
                        ? `Number of tracks: ${item.length}`
                        : "Number of items not available."}
                    </span>
                  </p>
                </div>
              </div>
            );
          }

          return <></>;
        })}
    </div>
  );
};

export default Cards;

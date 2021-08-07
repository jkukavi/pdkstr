import React from "react";

import playingQueue from "../icons/playingQueue.png";
import star from "../icons/star.png";

const defaultPuppyImg =
  "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=1.00xw:0.669xh;0,0.190xh&resize=1200:*";

const allowedTypes = ["video", "playlist", "channel"];

const Cards = ({
  arrayLoading,
  searchArray,
  viewingChannel,
  getDirectUrl,
  setActiveVideo,
  setListeningTo,
  addToHistory,
  addToFavourites,
  notify,
  getPlaylistVideos,
  addToQueue,
  getViewsString,
}) => {
  return (
    <>
      {viewingChannel && (
        <p
          style={{
            margin: "2rem 2rem 0rem",
            fontSize: "1.2rem",
            fontWeight: "bold",
          }}
        >
          Videos from channel {viewingChannel}:
        </p>
      )}

      <div className="cardContainer">
        {arrayLoading && (
          <div className="loading array">
            <div className="loader" />
          </div>
        )}
        {searchArray
          .filter(({ type }) => allowedTypes.includes(type) || !!viewingChannel)
          .map((item, i) => {
            const {
              url,
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
            } = item;

            if (type === "video") {
              return (
                <div className="card" key={i}>
                  <div
                    onClick={() => {
                      getDirectUrl(url);
                      setActiveVideo(null);
                      setListeningTo(item);
                      addToHistory(item);
                      notify(`Listening to: ${item.title}`);
                    }}
                    className="thumbnail"
                    style={{
                      background: `url(${
                        thumbnails
                          ? thumbnails[thumbnails.length - 1]?.url
                          : defaultPuppyImg
                      })`,
                      backgroundPosition: "center",
                      backgroundSize: "cover",
                    }}
                  />
                  <div className="descContainer">
                    <p className="desc title">
                      {`${title.substring(0, 50)}${
                        title.length > 50 ? "..." : ""
                      }`}
                    </p>

                    <>
                      <div className="channelDescAndPlaylist">
                        {!viewingChannel && (
                          <div className="channelDesc">
                            <div
                              className="authorThumbnail"
                              onClick={(event) => {
                                getPlaylistVideos(event, author.url);
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
                <div className="card channel" key={i}>
                  <p style={{ height: "0.4rem" }} className="desc title">
                    CHANNEL
                  </p>
                  <div
                    className="thumbnail"
                    onClick={(event) => {
                      getPlaylistVideos(event, url);
                    }}
                  >
                    <img
                      src={bestAvatar.url || defaultPuppyImg}
                      className="thumbnail"
                      alt="thumbnail"
                    />
                  </div>
                  <div className="descContainer">
                    <p style={{ height: "2rem" }} className="desc title">
                      {name}
                    </p>
                    <p className="desc">
                      {subscribers || "Subscribers not available"}
                    </p>
                  </div>
                </div>
              );
            }

            if (type === "playlist") {
              return (
                <div className="card playlist" key={i}>
                  <p style={{ height: "1rem" }} className="desc title">
                    PLAYLIST
                  </p>
                  <div
                    onClick={(event) => {
                      getPlaylistVideos(event, url);
                    }}
                    className="thumbnail"
                    style={{
                      background: `url(${
                        thumbnails
                          ? thumbnails[thumbnails.length - 1]?.url
                          : defaultPuppyImg
                      })`,
                      backgroundPosition: "center",
                      backgroundSize: "cover",
                    }}
                  />
                  <div className="descContainer">
                    <p className="desc title">
                      {`${title.substring(0, 50)}${
                        title.length > 50 ? "..." : ""
                      }`}
                    </p>
                    <p className="desc">
                      {item.length
                        ? `Number of tracks: ${item.length}`
                        : "Views not available"}
                    </p>
                  </div>
                </div>
              );
            }

            return <></>;
          })}
      </div>
    </>
  );
};

export default Cards;

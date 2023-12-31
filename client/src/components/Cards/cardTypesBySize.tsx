import React from "react";
import { SearchEngineIcon, defaultPuppyImg } from "consts";

import { getViewsString } from "helpers";
import { addToFavourites } from "apiCalls";

import star from "icons/star.svg";
import addToPlayingQueue from "icons/addToPlayingQueue.svg";
import playingQueue from "icons/playingQueue.svg";
import playButtonThumbnail from "icons/playButtonThumbnail.svg";
import browseList from "icons/browseList.svg";
import downloadPng from "icons/download.png";

import { Player as AudioPlayer } from "components/AudioShelf/Player";
import { PlayingQueue } from "components/AudioShelf/PlayingQueue";
import { PlaylistSidebar } from "components/PlaylistSidebar";
import { useHistory } from "react-router-dom";

const AddToFavouritesButton = ({
  item,
}: {
  item: Item | Channel | Playlist;
}) => {
  return (
    <div
      className="addToPlaylistIcon"
      onClick={() => {
        addToFavourites(item);
      }}
    >
      <img src={star} alt="loading"></img>
    </div>
  );
};

const resolveUrl = (item: Item) => {
  const { author } = item;
  try {
    return author.avatars[author.avatars.length - 1]?.url;
  } catch (e) {
    try {
      return author.bestAvatar.url;
    } catch {
      return defaultPuppyImg;
    }
  }
};

export const LargeSingleItem = ({
  viewingChannel,
  item,
}: {
  viewingChannel: any;
  item: Item;
}) => {
  const { title, thumbnails, duration, uploadedAt, author, views, key } = item;
  const history = useHistory();

  const goToChannel = () => {
    history.push(
      `/channel/${item.engine}/${
        item.author.channelID || (item.author as any).id
      }`
    );
  };
  return (
    <div className="card" key={key}>
      <div
        onClick={() => {
          AudioPlayer.playItem(item);
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
          />
        </div>

        <img src={playButtonThumbnail} className="playButton" alt="alt" />
      </div>
      <div className="descContainer">
        <p className="desc title">
          {`${title?.substring(0, 45)}${title?.length > 45 ? "..." : ""}`}
        </p>

        <>
          <div className="channelDescAndPlaylist">
            {!viewingChannel && (
              <div className="channelDesc">
                <div
                  className="authorThumbnail"
                  onClick={() => {
                    goToChannel();
                  }}
                  style={{
                    backgroundImage: `url(${resolveUrl(item)})`,
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
                  PlayingQueue.addToQueue(item);
                }}
              >
                <img src={addToPlayingQueue} alt="loading"></img>
              </div>
              <AddToFavouritesButton item={item} />
              <a
                href={`/proxy/dl/${item.engine}/${item.id}`}
                target="_blank"
                rel="noreferrer"
                className="addToPlaylistIcon"
              >
                <img src={downloadPng} alt="loading"></img>
              </a>
            </div>
          </div>

          <div className="metadata">
            <p className="desc">
              {views ? `${getViewsString(views)} views` : "Views not available"}
            </p>
            •<p className="desc">{duration || "Duration not available"}</p>•
            <p className="desc">
              {uploadedAt || "Uploaded date not available"}
            </p>
          </div>
        </>
      </div>
    </div>
  );
};

export const LargeChannel = ({
  item,
}: {
  item: Channel;
  channelClickAction: VoidFunction;
}) => {
  const { bestAvatar, name, subscribers, key } = item;

  const history = useHistory();

  const goToChannel = () => {
    history.push(
      `/channel/${item.engine}/${item.channelID}${history.location.search}`
    );
  };
  return (
    <div className="card channel" key={key}>
      <p style={{ height: "0.4rem" }} className="desc title">
        CHANNEL
      </p>
      <div
        className="thumbnail"
        onClick={() => {
          goToChannel();
        }}
      >
        <img
          src={bestAvatar?.url || defaultPuppyImg}
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
            <p className="desc">{subscribers || "Subscribers not available"}</p>
          </div>
          <AddToFavouritesButton item={item} />
        </div>
      </div>
    </div>
  );
};

export const LargePlaylist = ({ item }: { item: Playlist }) => {
  const { title, thumbnails, key } = item;
  return (
    <div className="card playlist" key={key}>
      <p style={{ height: "1rem" }} className="desc title">
        PLAYLIST
      </p>
      <div
        onClick={() => {
          PlayingQueue.playPlaylist(item);
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
              PlaylistSidebar.browsePlaylist(item);
            }}
          >
            <img src={browseList} alt="loading"></img>
          </div>
          <AddToFavouritesButton item={item} />
        </div>
        <p className="desc title singleLineText" style={{ marginTop: 0 }}>
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
};

export const SmallSingleItem = ({
  viewingChannel,
  item,
}: {
  viewingChannel: any;
  item: Item;
}) => {
  const { title, thumbnails, duration, uploadedAt, author, views, key } = item;
  const history = useHistory();

  const goToChannel = () => {
    history.push(
      `/channel/${item.engine}/${
        item.author.channelID || (item.author as any).id
      }`
    );
  };
  return (
    <div className="card csmall" key={key}>
      <p className="desc title">
        {`${title?.substring(0, 45)}${title?.length > 45 ? "..." : ""}`}
      </p>
      <div className="thumbnailAndDesc">
        <div
          onClick={() => {
            AudioPlayer.playItem(item);
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
            />
          </div>
          <img src={playButtonThumbnail} className="playButton" alt="alt" />
        </div>
        <div className="descContainer">
          <>
            <div className="channelDescAndPlaylist">
              <div style={{ display: "flex" }}>
                <div
                  className="addToPlaylistIcon"
                  onClick={() => {
                    PlayingQueue.addToQueue(item);
                  }}
                >
                  <img src={addToPlayingQueue} alt="loading"></img>
                </div>
                <AddToFavouritesButton item={item} />
                <a
                  href={`/proxy/dl/${item.engine}/${item.id}`}
                  target="_blank"
                  rel="noreferrer"
                  className="addToPlaylistIcon"
                >
                  <img src={downloadPng} alt="loading"></img>
                </a>
              </div>

              <div className="channelDesc">
                <div
                  className="authorThumbnail"
                  onClick={() => {
                    goToChannel();
                  }}
                  style={{
                    backgroundImage: `url(${resolveUrl(item)})`,
                  }}
                />
                <div className="desc channelName">
                  <p>{author?.name || "Name not found"}</p>
                </div>
              </div>
            </div>

            <div className="metadata">
              <p className="desc">
                {views
                  ? `${getViewsString(views)} views`
                  : "Views not available"}
              </p>
              •<p className="desc">{duration || "Duration not available"}</p>•
              <p className="desc">
                {uploadedAt || "Uploaded date not available"}
              </p>
            </div>
          </>
        </div>
      </div>
    </div>
  );
};

export const SmallChannel = ({
  item,
}: {
  item: Channel;
  channelClickAction: VoidFunction;
}) => {
  const { bestAvatar, name, subscribers, key } = item;

  const history = useHistory();

  const goToChannel = () => {
    history.push(
      `/channel/${item.engine}/${item.channelID}${history.location.search}`
    );
  };

  return (
    <div className="card csmall channel" key={key}>
      <p className="desc title">{name}</p>
      <div className="thumbnailAndDesc">
        <div
          className="thumbnail"
          onClick={() => {
            goToChannel();
          }}
        >
          <img
            src={bestAvatar?.url || defaultPuppyImg}
            className="thumbnail"
            alt="thumbnail"
          />
        </div>
        <div className="descContainer">
          <p className="desc">{`uploads: ${item.videos}`}</p>
          <AddToFavouritesButton item={item} />
        </div>
      </div>
    </div>
  );
};

export const SmallPlaylist = ({
  item,
}: {
  item: Playlist;
  channelClickAction: VoidFunction;
}) => {
  const thumbnail = item.thumbnails[0].url || defaultPuppyImg;

  return (
    <div className="card csmall playlist" key={item.key}>
      <p className="desc title">{item.title}</p>
      <div className="thumbnailAndDesc">
        <div
          onClick={() => {
            PlayingQueue.playPlaylist(item);
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
            <img className="image" src={thumbnail} alt="alt"></img>
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
          <p className="desc">{`number of tracks: ${item.playlistLength}`}</p>
          <div style={{ display: "flex", width: "20rem" }}>
            <div
              className="addToPlaylistIcon playlist"
              onClick={() => {
                PlaylistSidebar.browsePlaylist(item);
              }}
            >
              <img src={browseList} alt="loading"></img>
            </div>
            <AddToFavouritesButton item={item} />
          </div>
        </div>
      </div>
    </div>
  );
};

const cardTypesBySize = {
  large: {
    item: LargeSingleItem,
    playlist: LargePlaylist,
    channel: LargeChannel,
  },
  small: {
    item: SmallSingleItem,
    playlist: SmallPlaylist,
    channel: SmallChannel,
  },
} as const;

export default cardTypesBySize;

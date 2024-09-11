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
import styled, { css } from "styled-components";

/* Sve dobro provjeri jos jednom */

const Card = styled.div`
  will-change: transform;
  backface-visibility: none;
  width: 16.6rem;
  height: 20.6rem;
  margin: 0 0.3rem 1rem;
  padding: 0.3rem;
  background-color: rgb(199, 61, 61);
  box-shadow: 1px 2px 2px 1px rgb(27 27 27);
  transition: transform 0.3s, box-shadow 0.1s;
  /* transform: scale(1) rotate(0.02deg); */
  border-radius: 7px;

  &:hover {
    transform: scale(1.01) rotate(0.02deg);
    box-shadow: 1px 2px 4px 1px rgb(27 27 27 / 78%);
  }
`;

const ChannelCard = styled(Card)`
  display: block;
  background-color: #f1a12b;
  align-items: center;
`;

const PlaylistCard = styled(ChannelCard)`
  text-align: center;
`;

const CardThumbnail = styled.div`
  cursor: pointer;
  height: 12rem;
  width: 16rem;
  border-radius: 5px;
  position: relative;
`;

const CardOverlay = styled.div`
  transition: filter 0.2s;
  filter: brightness(1);
  width: 100%;
  height: 100%;
  &:hover {
    filter: brightness(0.6);
  }
`;

const CardThumbnailImage = styled.img`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  object-fit: cover;
`;

const CardThumbanilPlaybutton = styled.img`
  filter: invert(1);
  width: 65px;
  height: 65px;
  opacity: 0;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  transition: opacity 0.2s;
  filter: drop-shadow(2px 4px 3px black);
  &:hover {
    /* upitno, provjeri ide li tu */
    z-index: 3;
    opacity: 1;
  }
`;

const DescContainer = styled.div`
  padding: 0 0.6rem 0;
`;

const DescTitle = styled.p`
  font-weight: 600;
  height: 3rem;
  /* Provjeri funkcionira li ovo ispod tako, ili moze i bez pa se vuce iz .css filea */
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
`;

const ChannelDescAndPlaylist = styled.div`
  display: inline-flex;
  width: 105%;
  justify-content: space-between;
`;

const ChannelDesc = styled.div`
  margin-right: 0.5rem;
  display: flex;
  align-items: center;
`;

const AuthorThumbnail = styled.div`
  cursor: pointer;
  height: 2rem;
  width: 2rem;
  border-radius: 50%;
  background-position: center;
  background-size: contain;
  margin-right: 0.5rem;
  box-shadow: 2px 2px 2px black;
  transition: box-shadow 0.2s, border 0.5s;
`;

const ChannelDescName = styled.div`
  max-width: 90px;
  font-size: 0.8rem;
  font-weight: 600;
  &p {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`;

const AddToPlaylistIcon = styled.div`
  /* provjeri kako od ovog napraviti da je styled.a sa istim stilovima i istim stilovima za sliku */
  margin-right: 3px;
  transition: background-color 0.2s;
  border-radius: 3px;
  cursor: pointer;
  width: 33px;
  height: 33px;
  display: flex;
  justify-content: center;
  align-items: center;

  &img {
    height: 80%;
    width: 80%;
  }
`;

const DescContainerMetadata = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  &p {
    font-size: 0.8rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    max-width: 33%;
  }
`;

const SingleLineText = styled(DescTitle)`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin-top: 0;
  margin-bottom: 0.5rem;
`;

/* CHANNEL CARD */

const ChannelCardLabel = styled(DescTitle)`
  width: fit-content;
  max-width: 14rem;
  margin: auto;
`;

const ChannelCardThumbanail = styled(CardThumbnail)`
  /* provjeri kako ces rijesiti sliku s istim classom */
  width: 14rem;
  height: 14rem;
  border-radius: 50%;
  margin: 0.5rem auto 0;
`;

const ChannelDescContainer = styled(DescContainer)`
  margin-top: 1.8rem;
`;

const FlexContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  height: 100%;
  align-items: center;
`;

/* SMALL CARDS */

const SmallCard = styled(Card)`
  height: 8.5rem;
  margin-bottom: 8px;
`;

const SmallCardTitle = styled(DescTitle)`
  margin: 0px;
  height: 1.8rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const SmallThumbnailContainer = styled.div`
  display: flex;
  height: 58%;
`;

const SmallThumbnail = styled(CardThumbnail)`
  width: 40%;
  height: 100%;
`;

const SmallDescContainer = styled(DescContainer)`
  width: 55%;
  padding: 0 0 0 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const SmallChannelDescAndPlaylist = styled(ChannelDescAndPlaylist)`
  flex-direction: column;
  gap: 2px;
`;

const SmallCardMetadata = styled.div`
  display: flex;
  width: 30%;
  min-width: 15.5rem;
  justify-content: space-around;
  align-items: center;

  &p {
    font-size: 0.8rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    max-width: 33%;
  }
`;
/* SMALL CARD PLAYLIST */

const SmallPlaylistCard = styled(PlaylistCard)`
  /* Provjeri kako se izradi komponenta, ali od dvije komponente*/
  height: 8.5rem;
  margin-bottom: 8px;
  text-align: left;
`;

/* SMALL CARD CHANNEL */

const SmallCardChannel = styled(ChannelCard)`
  /* Provjeri kako se izradi komponenta, ali od dvije komponente*/
  height: 8.5rem;
  margin-bottom: 8px;
`;

const SmallChannelTitle = styled(SmallCardTitle)`
  /* Dobro provjeri */
  margin: 0;
  width: fit-content;
  max-width: 14rem;
`;

const SmallThumbanilAndDescChan = styled(SmallThumbnailContainer)`
  justify-content: flex-start;
`;

const SmallChannelThumbanil = styled(CardThumbnail)`
  border-radius: 50%;
  width: 5.9rem;
  height: 5.9rem;
  margin: 0;
  /* Provjeri za img sa istim classom */
`;

const ChannelSmallDescContainer = styled(SmallDescContainer)`
  margin: 0;
  font-size: 16px;
  align-self: flex-start;
  &p {
    margin: 0;
    width: fit-content;
    max-width: 14rem;
  }
`;

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
  item,
  translucent = false,
}: {
  item: Item;
  translucent?: boolean;
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
    <div className={"card csmall" + (translucent ? " overview" : "")} key={key}>
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
          </>
        </div>
      </div>
      <div className="metadata">
        <p className="desc">
          {views ? `${getViewsString(views)} views` : "Views not available"}
        </p>
        •<p className="desc">{duration || "Duration not available"}</p>•
        <p className="desc">{uploadedAt || "Uploaded date not available"}</p>
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

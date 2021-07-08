import React, { useState } from "react";
import "./App.css";
import axios from "axios";
import loadingGif from "./giphy.webp";
import playIcon from "./playicon.png";

const defaultPuppyImg =
  "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=1.00xw:0.669xh;0,0.190xh&resize=1200:*";

function App() {
  const [directUrl, setDirectUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchString, setSearchString] = useState("");
  const [searchArray, setSearchArray] = useState([]);

  const getDirectUrl = async (url) => {
    setDirectUrl(null);
    setLoading(true);
    try {
      const response = await axios.post("/url", {
        url,
      });
      const { directUrl } = response.data;
      setDirectUrl(directUrl);
    } catch (e) {
      prompt("some error happened");
    } finally {
      setLoading(false);
    }
  };

  const searchYoutube = async (event) => {
    event.preventDefault();
    setSearchArray([]);
    setLoading(true);
    try {
      const response = await axios.post("/search", {
        searchString,
      });
      const searchResultsArray = response.data.searchResultsArray;
      setSearchArray(searchResultsArray);
    } catch (e) {
    } finally {
      setLoading(false);
    }
  };

  const handleInput = (e) => {
    setSearchString(e.target.value);
    console.log(e.target.value);
  };
  return (
    <>
      <div class="container">
        <form class="form">
          <input
            class="input"
            value={searchString}
            onChange={handleInput}
          ></input>
          <button class="button" onClick={searchYoutube}>
            Search
          </button>

          {directUrl && (
            <div style={{ margin: "2rem 1rem 0rem" }}>
              <audio controls>
                <source src={directUrl} type="audio/webm" />
              </audio>
            </div>
          )}
          {loading && (
            <div className="loading">
              <img src={loadingGif} alt="loading" />
            </div>
          )}
          <div className="cardContainer">
            {searchArray
              .filter(({ type }) => type === "video")
              .map(({ url, title, thumbnails, author, views }) => {
                console.log(searchArray);
                return (
                  <div className="card">
                    <div className="thumbnail">
                      <img
                        src={
                          thumbnails
                            ? thumbnails[thumbnails.length - 1]?.url
                            : defaultPuppyImg
                        }
                        className="thumbnail"
                        alt="thumbnail"
                      />
                    </div>
                    <div className="descContainer">
                      <p className="desc title">{title}</p>
                      <div className="channelDesc">
                        <div
                          className="authorThumbnail"
                          style={{
                            backgroundImage: `url(${
                              author?.bestAvatar?.url || defaultPuppyImg
                            })`,
                          }}
                        />
                        <p className="desc channelName">
                          {author?.name || "Name not found"}
                        </p>
                      </div>
                      <p className="desc">
                        Views: {views || "Views not available"}
                      </p>
                      <div className="controlsContainer">
                        <img
                          src={playIcon}
                          onClick={() => getDirectUrl(url)}
                          alt="playButton"
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </form>
      </div>
    </>
  );
}

export default App;

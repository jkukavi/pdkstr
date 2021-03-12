import React, { useState } from "react";
import "./App.css";
import axios from "axios";

const imgLoc =
  "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=1.00xw:0.669xh;0,0.190xh&resize=1200:*";

function App() {
  const [url, setUrl] = useState("");
  const [directUrl, setDirectUrl] = useState(null);

  const getDirectUrl = async () => {
    setDirectUrl(null);
    try {
      const response = await axios.post("/url", {
        url,
      });
      const { directUrl } = response.data;
      setDirectUrl(directUrl);
    } catch (e) {}
  };

  const handleInput = (e) => {
    setUrl(e.target.value);
    console.log(e.target.value);
  };
  return (
    <>
      <div class="container">
        <div class="form">
          <input class="input" value={url} onChange={handleInput}></input>
          <button class="button" onClick={() => getDirectUrl()}>
            Send Url
          </button>
          {directUrl && (
            <div style={{ margin: "2rem 1rem 0rem" }}>
              <audio controls>
                <source src={directUrl} type="audio/webm" />
              </audio>
            </div>
          )}
          <div className="cardContainer">
            {[0, 0, 0, 0, 0, 0, 0].map(() => (
              <div className="card">
                <div className="thumbnail">
                  <img src={imgLoc} className="thumbnail" alt="thumbnail" />
                </div>
                <div className="desc">Title: bla bla Desc: bla bla</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

import React from "react";
import Loaders from "./Loaders";

const ShareAlert = ({ info, alert, playItem }: any) => {
  return (
    <div className={`alertBox ${alert ? "appear" : ""}`}>
      <p>Hello there man, somebody sent you a song you need to check!</p>
      <div className="alertMessageContainer">
        {info ? (
          <>
            <p className="alertMessage">{info.author.name}</p>
            <p className="alertMessage">{info.title}</p>
          </>
        ) : (
          <div
            /*className="loading audio"*/
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              top: " -0.5rem",
              height: "3rem",
            }}
          >
            <div
              /*className="miniloader"*/
              style={{
                border: "6px solid transparent",
                borderRadius: " 50%",
                borderTop: " 6px solid #db9134",
                width: "4rem",
                height: "4rem",
                animation: "spin 2s linear infinite",
                filter: "drop-shadow(1px 1px 1px black)",
              }}
            />
          </div>
        )}
      </div>

      <button
        className="button small"
        onClick={() => {
          playItem(info);
        }}
      >
        Let it hit the speakers!
      </button>
    </div>
  );
};

export default ShareAlert;

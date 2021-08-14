import React from "react";

const ShareAlert = ({
  info,
  alert,
  getDirectUrl,
  setListeningTo,
  notify,
  setAlert,
}) => {
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
          <div className="loading audio">
            <div className="miniloader" />
          </div>
        )}
      </div>

      <button
        className="button small"
        onClick={() => {
          getDirectUrl(info);
          setListeningTo(info);
          notify(`Listening to: ${info.title}`);
          setAlert(null);
        }}
      >
        Let it hit the speakers!
      </button>
    </div>
  );
};

export default ShareAlert;

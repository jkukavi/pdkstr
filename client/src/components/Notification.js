import React, { useEffect, useState } from "react";

import note from "../icons/note.png";

const Notification = ({ notification }) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    setTimeout(() => setShow(false), 2000);
  }, []);

  return (
    show && (
      <div className="notification">
        <img
          src={note}
          alt="alt"
          style={{ filter: "invert(0.8)", height: "1.4rem" }}
        ></img>
        <p style={{ fontStyle: "italic" }}> {notification}</p>
        <img
          src={note}
          alt="alt"
          style={{ filter: "invert(0.8)", height: "1.4rem" }}
        ></img>
      </div>
    )
  );
};

export default Notification;

import React, { useEffect, useState } from "react";

const Notification = ({ notification }: { notification: string }) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    setTimeout(() => setShow(false), 2000);
  }, []);

  return show ? (
    <div className="notification">
      <p style={{ fontStyle: "italic" }}> {notification}</p>
    </div>
  ) : (
    <></>
  );
};

export default Notification;

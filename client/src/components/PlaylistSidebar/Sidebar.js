import React, { useState, useEffect } from "react";

const Sidebar = ({ children, closeMe }) => {
  const [expanded, setExpanded] = useState(false);

  const expand = () => {
    // to make sure this gets called *after* everything is rendered.
    requestAnimationFrame(() => {
      setExpanded(true);
    });
  };

  useEffect(expand, []);
  return (
    <>
      <div className={`playlistSidebarContainer ${expanded ? "expanded" : ""}`}>
        {children}
      </div>
      <DarkOverlay closeMe={closeMe} />
    </>
  );
};

export default Sidebar;

const DarkOverlay = ({ closeMe }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShow(true);
    }, 500);
  }, []);

  if (!show) return null;

  return (
    <div
      onClick={closeMe}
      style={{
        backgroundColor: "rgb(0 0 0 / 80%)",
        position: "absolute",
        top: 0,
        left: 0,
        height: "100%",
        width: "100%",
        zIndex: 3,
      }}
    ></div>
  );
};

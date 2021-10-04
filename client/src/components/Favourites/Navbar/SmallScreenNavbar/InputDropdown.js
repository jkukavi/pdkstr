import React, { useState, useEffect, useRef } from "react";

import magnifier from "icons/magnifier.svg";
import closeIcon from "icons/close.svg";

const InputDropdown = ({
  queryString,
  deleteQuery,
  debouncedSetQueryString,
}) => {
  const [inputDroppedDown, setInputDroppedDown] = useState(!!queryString);
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.value = queryString;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const inputDropdown = {
    open: () => {
      setInputDroppedDown(true);
    },
    close: () => {
      setInputDroppedDown(false);
      deleteQuery();
    },
  };

  const onInputChange = (e) => {
    const newString = e.target.value;
    debouncedSetQueryString(newString);
  };

  return (
    <div>
      <div onClick={inputDropdown.open} className="iconHolder">
        <img src={magnifier} alt="alt" />
      </div>
      <div
        className={`inputContainer ${inputDroppedDown ? "droppedDown" : ""}`}
      >
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "85%",
            padding: "0 0.3rem 0",
          }}
        >
          <input
            ref={inputRef}
            type="text"
            placeholder="Filter favourites"
            style={{
              fontSize: "1.1rem",
              width: "100%",
              height: "100%",
            }}
            onChange={onInputChange}
          />
          <div
            onClick={inputDropdown.close}
            style={{
              position: "absolute",
              top: 0,
              right: "10px",
              height: "100%",
              width: "1.4rem",
              background: `url(${closeIcon}) center center / contain no-repeat`,
              filter: "invert(0.6)",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default InputDropdown;

import React from "react";
import styled from "styled-components";

const basic = () => {
  /* const Loading = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 3rem;
    margin: 6rem;
    //&.array {
    //align-items: flex-start;
    // }
  `;
  */

  return (
    <div
      /*className="loading array"*/
      //untill height 3rem for loading class,after that for array
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "3rem",
        margin: "auto",
        //alignItems: "flex-start",
      }}
    >
      <div
        //className="loader"
        style={{
          border: "14px solid transparent",
          borderRadius: "50%",
          borderTop: "14px solid #db9134",
          width: "300px",
          height: "300px",
          animation: "spin 1.4s linear infinite",
          filter: "drop-shadow(1px 1px 1px black)",
        }}
      />
    </div>
  );
};

const mini = () => {
  return (
    <div
      //className="audioLoaderContainer"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "7.7rem",
      }}
    >
      <div
        // className="miniloader"
        style={{
          border: "6px solid transparent",
          borderRadius: "50%",
          borderTop: " 6px solid #db9134",
          width: "4rem",
          height: "4rem",
          animation: "spin 2s linear infinite",
          filter: " drop-shadow(1px 1px 1px black)",
        }}
      />
    </div>
  );
};

const micro = () => {
  return (
    <div
      //className="microloader"
      style={{
        border: "3px solid transparent",
        borderRadius: " 50%",
        borderTop: " 3px solid #db9134",
        width: "2rem",
        height: "2rem",
        animation: " spin 1.4s linear infinite",
        filter: "drop-shadow(1px 1px 0.8px #000000)",
      }}
    />
  );
};

const tiny = () => {
  return (
    <div
      //className="tinyloader"
      style={{
        margin: "auto",
        border: "3px solid transparent",
        borderRadius: "50%",
        borderTop: "3px solid #5536d0",
        width: "2rem",
        height: "2rem",
        animation: "spin 1.4s linear infinite",
        filter: " drop-shadow(1px 1px 0.8px #000000)",
      }}
    />
  );
};

export default { basic, mini, micro, tiny };

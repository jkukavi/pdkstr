import React from "react";
import styled from "styled-components";

import chevron from "icons/chevron.svg";
import magnifier from "icons/magnifier.svg";
import microphone from "icons/microphone.svg";

import recognizeAndStartSearch from "helpers/speechRecognition";

const Button = styled.button`
  background-color: #3d3d3d;
  height: 100%;
  padding: 0 1rem 0;
  border: 1px solid rgb(82, 82, 82);
  border-left: none;
  border-radius: 0 2px 2px 0;
  display: inline-flex;
  align-items: center;
`;

const MicrophoneButton = styled(Button)`
  border: none;
  height: 2rem;
  background-color: unset;
  cursor: pointer;

  & img {
    filter: invert(0.7);
    /*transform: rotate(90deg);*/
    height: 24px;
    width: 24px;
  }
  & img:hover {
    filter: invert(0.9);
  }
`;

const SearchButton = styled(Button)`
  height: 2rem;

  & img {
    filter: invert(0.7);
    /*transform: rotate(90deg);*/
    height: 24px;
    width: 24px;
  }
  & img:hover {
    filter: invert(0.9);
  }
`;

export const GoBackButton = ({ onClick }: { onClick: VoidFunction }) => {
  return (
    <MicrophoneButton
      /*className="button microphone"*/
      /*type="button"*/
      style={{ padding: 0 }}
      onClick={onClick}
    >
      <img src={chevron} alt="alt" style={{ transform: "rotate(90deg)" }} />
    </MicrophoneButton>
  );
};

export const StartSearchButton = () => (
  <SearchButton /*className="button search"*/ type="submit">
    <img src={magnifier} alt="alt" />
  </SearchButton>
);

export const VoiceSearchButton = () => (
  <MicrophoneButton
    onClick={recognizeAndStartSearch()} /*className="button microphone"*/
  >
    <img src={microphone} alt="alt" />
  </MicrophoneButton>
);

export const ShowInputButton = ({ onClick }: { onClick: VoidFunction }) => (
  <MicrophoneButton
    /*className="button microphone"*/ /*type="button"*/
    onClick={onClick}
  >
    <img src={magnifier} alt="alt" />
  </MicrophoneButton>
);

import React from "react";
import styled from "styled-components";

import chevron from "icons/chevron.svg";
import magnifier from "icons/magnifier.svg";
import microphone from "icons/microphone.svg";

import recognizeAndStartSearch from "helpers/speechRecognition";

const Button = styled.button`
  background-color: ${({ theme }) => theme.searchbox.button.backgroundColor};
  height: 100%;
  padding: 0 1rem 0;
  border: 1px solid ${({ theme }) => theme.searchbox.button.borderColor};
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
    height: 24px;
    width: 24px;
  }
  & img:hover {
    filter: invert(0.9);
  }
`;

export const GoBackButton = ({ onClick }: { onClick: VoidFunction }) => {
  return (
    <MicrophoneButton style={{ padding: 0 }} onClick={onClick}>
      <img src={chevron} alt="alt" style={{ transform: "rotate(90deg)" }} />
    </MicrophoneButton>
  );
};

export const StartSearchButton = () => (
  <SearchButton type="submit">
    <img src={magnifier} alt="alt" />
  </SearchButton>
);

export const VoiceSearchButton = () => (
  <MicrophoneButton onClick={recognizeAndStartSearch()}>
    <img src={microphone} alt="alt" />
  </MicrophoneButton>
);

export const ShowInputButton = ({ onClick }: { onClick: VoidFunction }) => (
  <MicrophoneButton onClick={onClick}>
    <img src={magnifier} alt="alt" />
  </MicrophoneButton>
);

import { theme } from "consts/theme";
import React, { useEffect, useState } from "react";
import styled, { StyledComponent } from "styled-components";

const NotificationComponent = styled.div`
  will-change: transform;
  font-size: 1rem;
  overflow: hidden;
  background-color: ${({ theme }) => theme.notifications.backgroundColor};
  color: #c9c9c9;
  padding: 0.4rem;
  margin: 0.5rem 0;
  width: fit-content;
  max-width: 80vw;
  animation: notify 2s forwards;
  box-shadow: 2px 2px 2px 0px black;
  z-index: 1;
  display: flex;
  align-items: center;
  transform: translate(0);

  @keyframes notify {
    0% {
      transform: translate(-100vw);
    }
    20% {
      transform: translate(0.5rem);
    }
    80% {
      transform: translate(0.5rem);
    }
    100% {
      transform: translate(-100vw);
    }
  }
`;
const NotificationContainer = styled.div`
  position: absolute;
  top: 3rem;
  left: 0;
  z-index: 5;
`;

const Notification = ({ notification }: { notification: string }) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    setTimeout(() => setShow(false), 2000);
  }, []);

  return show ? (
    <NotificationContainer>
      <NotificationComponent>
        <p style={{ fontStyle: "italic" }}> {notification}</p>
      </NotificationComponent>
    </NotificationContainer>
  ) : (
    <></>
  );
};

export default Notification;

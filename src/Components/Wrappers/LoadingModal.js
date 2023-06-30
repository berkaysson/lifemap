import React from "react";
import styled from "styled-components";
import { CircularProgress } from "@mui/material";
import { theme } from "../../Style/theme";

const LoadingModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 9999;
`;

const LoadingText = styled.p`
  color: white;
  font-size: 18px;
  color: black;
`;

const LoadingModal = () => {
  return (
    <LoadingModalWrapper>
      <LoadingText>Loading...</LoadingText>
      <CircularProgress
        sx={{
          color: `${theme.colors.themeSecondary}`,
        }}
      />
    </LoadingModalWrapper>
  );
};

export default LoadingModal;

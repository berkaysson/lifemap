import React from "react";
import LinearProgress from "@mui/material/LinearProgress";
import { theme } from "../../Style/theme";
import styled from "styled-components";

const ProgressBarWrapper = styled.div`
  position: relative;
  margin-top: 1rem;
`;

const CurrentValueWrapper = styled.span`
  position: absolute;
  z-index: 1;
  font-size: 0.8em;
  top: 2px;
  left: 10px;
`;

const PercantageWrapper = styled.span`
  position: absolute;
  z-index: 1;
  font-size: 0.8em;
  top: 2px;
  right: 10px;
`;

const ProgressBar = ({ currentValue, goalValue }) => {
  const calculatedProgressPercentage = (currentValue / goalValue) * 100
  const progressPercentage =
  calculatedProgressPercentage > 100
      ? 100
      : calculatedProgressPercentage;

  return (
    <ProgressBarWrapper>
      <CurrentValueWrapper>Done: {currentValue}</CurrentValueWrapper>
      <PercantageWrapper>{calculatedProgressPercentage}%</PercantageWrapper>
      <LinearProgress
        variant="determinate"
        value={progressPercentage}
        sx={{
          bgcolor: `${theme.colors.secondary}`,
          boxShadow: `${theme.boxShadows.themeShadow}`,
          borderRadius: `${theme.radius.large}`,
          height: `${theme.sizes.large}`,
          border: `1px solid ${(theme.colors.secondary)}`,

          "& .MuiLinearProgress-bar": {
            bgcolor: `${theme.colors.theme}`,
            boxShadow: `${theme.boxShadows.innerSmallShadow}`,
            borderRadius: `1px`,
          },
        }}
      />
    </ProgressBarWrapper>
  );
};

export default ProgressBar;

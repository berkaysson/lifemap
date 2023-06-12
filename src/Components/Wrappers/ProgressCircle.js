import React from "react";
import LinearProgress from "@mui/material/LinearProgress";
import { theme } from "../../Style/theme";
import styled from "styled-components";
import { Tooltip } from "@mui/material";

const CIRCLE_DIAMETER = "30px";

const ProgressCircleWrapper = styled.div`
  position: relative;
  width: ${CIRCLE_DIAMETER};
  height: ${CIRCLE_DIAMETER};
  transform: rotate(-90deg);
  z-index:1;
  transition: 0.2s ease-in transform;

  &:hover{
    transform: scale(1.4) rotate(-90deg);
    z-index:2;
  }
`;

const ProgressCircle = ({ currentValue, goalValue, unit }) => {
  const calculatedProgressPercentage = (currentValue / goalValue) * 100;
  const progressPercentage =
    calculatedProgressPercentage > 100 ? 100 : calculatedProgressPercentage;
  const toolTipText = `Date: ${unit.startDate}/${unit.endDate} | 
  Done: ${unit.currentValue}/${unit.goalValue} | 
  Percentage: ${Math.round(calculatedProgressPercentage)}%
  `;
  return (
    <ProgressCircleWrapper>
      <Tooltip title={toolTipText}>
        <LinearProgress
          variant="determinate"
          value={progressPercentage}
          sx={{
            bgcolor: `${theme.colors.alternative}`,
            borderRadius: `50%`,
            height: `${CIRCLE_DIAMETER}`,
            border: `1px solid ${theme.colors.theme}`,

            "&:hover":{
              boxShadow: `${theme.boxShadows.themeShadow}`,
            },

            "& .MuiLinearProgress-bar": {
              bgcolor: `${theme.colors.theme}`,
              boxShadow: `${theme.boxShadows.smallCardShadow}`,
              borderRadius: `1px`,
            },
          }}
        />
      </Tooltip>
    </ProgressCircleWrapper>
  );
};

export default ProgressCircle;

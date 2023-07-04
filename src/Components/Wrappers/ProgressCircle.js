import React from "react";
import LinearProgress from "@mui/material/LinearProgress";
import { theme } from "../../Style/theme";
import styled from "styled-components";
import { Tooltip } from "@mui/material";
import moment from "moment";

const CIRCLE_DIAMETER = "27px";

const ProgressCircleWrapper = styled.div`
  position: relative;
  width: ${CIRCLE_DIAMETER};
  height: ${CIRCLE_DIAMETER};
  transform: rotate(-90deg);
  z-index: 1;
  transition: 0.1s ease-in transform;

  &:hover {
    transform: scale(1.3) rotate(-90deg);
    z-index: 2;
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

  let borderColor = theme.colors.theme;

  const CURRENT_DATE = moment().startOf('day');
  const unitEndDate = moment(unit.endDate);
  const unitStartDate = moment(unit.startDate);

  if(unitEndDate.isBefore(CURRENT_DATE)){
    borderColor = unit.isFulfilled ? theme.colors.success : theme.colors.danger;
  }
  if(CURRENT_DATE.isBetween(unitStartDate, unitEndDate, null, [])){
    borderColor = theme.colors.primary;
  }
  
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
            border: `1px solid ${borderColor}`,

            "&:hover": {
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

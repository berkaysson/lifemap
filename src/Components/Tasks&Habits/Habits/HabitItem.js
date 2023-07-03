import React from "react";
import moment from "moment";
import styled from "styled-components";

import Button from "../../Wrappers/Styled-Elements/Button";
import ProgressCircle from "../../Wrappers/ProgressCircle";
import { formatDate } from "../../../Utilities/dateHelpers";
import RefreshButton from "../../Wrappers/Styled-Elements/RefreshButton";

const TaskItemWrapper = styled.li`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: ${({ theme }) => theme.sizes.medium};
  border: 1px solid ${({ theme }) => theme.colors.alternative};
  border-radius: ${({ theme }) => theme.radius.small};
  box-shadow: ${({ theme }) => theme.boxShadows.innerSmallShadow};
  gap: ${({ theme }) => theme.sizes.medium};
  position: relative;
  background-color: ${({ isClosed, theme }) =>
    isClosed ? theme.colors.alternative : theme.colors.secondary};

  & > Button {
    position: absolute;
    top: ${({ theme }) => theme.sizes.medium};
    right: ${({ theme }) => theme.sizes.medium};
    display: ${({isDeleteActive}) => isDeleteActive ? "block" : "none"};
    
    @media (max-width: 768px) {
      position: relative;
      margin-left: 40%;
      margin-bottom: ${({ theme }) => theme.sizes.medium};
    }
  }

  @media (max-width: 768px) {
    gap: ${({ theme }) => theme.sizes.small};
  }
`;

const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.sizes.medium};
  font-weight: bold;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 3px;
  }
`;

const HeaderItem = styled.h3`
  color: ${({ headerColor, theme }) =>
    headerColor ? theme.colors.success : theme.colors.danger};
`;

const DateWrapper = styled.div`
  width: 100%;
  text-align: left;
  margin-left: ${({ theme }) => theme.sizes.medium};

  @media (max-width: 768px) {
    margin-left: 0;
  }
`;

const ProgressCircleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: auto;
  gap: 4px;
  flex-wrap: wrap;
  padding: ${({ theme }) => theme.sizes.small};
  border: 1px solid ${({ theme }) => theme.colors.alternative};
  border-radius: ${({ theme }) => theme.radius.small};
`;

const HabitItem = ({ habit, onDeleteHabitDataUnit, isDeleteActive=true, fetchUpdateHandler }) => {
  const deleteHandler = () => {
    onDeleteHabitDataUnit(habit.id);
  };
  return (
    <TaskItemWrapper id={habit?.id} isClosed={habit?.isClosed} isDeleteActive={isDeleteActive} >
      <HeaderWrapper>
        <HeaderItem headerColor={habit?.isFulfilled}>
          {habit?.nameValue} {habit?.isClosed ? "(Expired)" : ""}{" "}
        </HeaderItem>
        <p>{habit?.category.label}</p>
        <p>{habit?.subCategory.label}</p>
      </HeaderWrapper>
      <DateWrapper>
        <p>
          {habit?.startDate} /
          {habit
            ? formatDate(moment(habit?.endDate).subtract(1, "day"))
            : "no end date"}
        </p>
        <p>Time Value: {habit?.timeValue}</p>
        <p>Check Frequency: {habit?.frequency}</p>
      </DateWrapper>
      <ProgressCircleWrapper>
        {habit?.checkpointObjects?.map((item, index) => (
          <ProgressCircle
            key={index}
            currentValue={item?.currentValue}
            goalValue={item?.goalValue}
            unit={item}
          />
        ))}
      </ProgressCircleWrapper>
      <Button type={"button"} text={"Delete"} onClick={deleteHandler} />
      <RefreshButton fetchUpdateHandler={fetchUpdateHandler} />
    </TaskItemWrapper>
  );
};

export default HabitItem;

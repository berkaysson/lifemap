import React from "react";
import moment from "moment";
import styled from "styled-components";

import Button from "../../Wrappers/Styled-Elements/Button";

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

  & > Button {
    position: absolute;
    top: ${({ theme }) => theme.sizes.medium};
    right: ${({ theme }) => theme.sizes.medium};
  }
`;

const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.sizes.medium};
  font-weight: bold;
`;

const HeaderItem = styled.h3`
  color: ${({ headerColor, theme }) =>
    headerColor ? theme.colors.success : theme.colors.danger};
`;

const DateWrapper = styled.div`
  width: 100%;
  text-align: left;
  margin-left: ${({ theme }) => theme.sizes.medium};
`;

const HabitItem = ({ habit, onDeleteHabitDataUnit }) => {
  const deleteHandler = () => {
    onDeleteHabitDataUnit(habit.id);
  };
  return (
    <TaskItemWrapper id={habit?.id} isClosed={habit?.isClosed}>
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
            ? moment(new Date(habit?.endDate))
                .subtract(1, "day")
                .format("YYYY-MM-DD")
            : "no end date"}
        </p>
        <p>Time Value: {habit?.timeValue}</p>
        <p>Check Frequency: {habit?.frequency}</p>
      </DateWrapper>
      <Button type={"button"} text={"Delete"} onClick={deleteHandler} />
    </TaskItemWrapper>
  );
};

export default HabitItem;

import React from "react";

import Button from "../../Wrappers/Styled-Elements/Button";
import styled from "styled-components";
import ProgressBar from "../../Wrappers/ProgressBar";

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
    display: ${({ isDeleteActive }) => (isDeleteActive ? "block" : "none")};

    @media (max-width: 768px) {
      top: ${({ theme }) => theme.sizes.small};
      right: ${({ theme }) => theme.sizes.small};
    }
  }

  @media (max-width: 768px) {
    padding: ${({ theme }) => theme.sizes.medium};
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

  & > p {
    margin-bottom: 5px;
    margin-left: ${({ theme }) => theme.sizes.medium};

    @media (max-width: 768px) {
      margin-left: 0;
    }
  }
`;

const TaskItem = ({ task, onDeleteTaskDataUnit, isDeleteActive = true }) => {
  const deleteHandler = () => {
    onDeleteTaskDataUnit(task.id);
  };
  return (
    <TaskItemWrapper
      id={task?.id}
      isClosed={task?.isClosed}
      isDeleteActive={isDeleteActive}
    >
      <HeaderWrapper>
        <HeaderItem headerColor={task?.isFulfilled}>
          {task?.nameValue} {task?.isClosed ? "(Expired)" : ""}
        </HeaderItem>
        <p>{task?.category.label}</p> <p>{task?.subCategory.label}</p>
      </HeaderWrapper>
      <DateWrapper>
        <p>
          {task?.startDate} / {task?.endDate}
        </p>
        <p>Goal Value: {task?.timeValue}</p>
        <ProgressBar
          currentValue={task?.completedValue}
          goalValue={task?.timeValue}
        />
      </DateWrapper>
      <Button type={"button"} text={"Delete"} onClick={deleteHandler} />
    </TaskItemWrapper>
  );
};

export default TaskItem;

import React from "react";
import styled from "styled-components";

import TaskItem from "./Tasks/TaskItem";
import HabitItem from "./Habits/HabitItem";
import { CardWrapper } from "../Wrappers/Styled-Wrappers/CardWrapper";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: ${({theme})=> theme.sizes.medium};
  width: 100%;
  padding: ${({theme})=> theme.sizes.medium};
`;

const Container = styled.div`
  border: 1px solid ${({theme})=> theme.colors.alternative};
  border-radius: ${({theme})=> theme.radius.medium};
  padding: ${({theme})=> theme.sizes.medium};
  width: 100%;
  display:flex;
  flex-direction: column;
  gap: ${({theme})=> theme.sizes.medium};
`

const ListWrapper = styled.ul`
  display:flex;
  flex-direction: column;
  gap: ${({theme})=> theme.sizes.medium};
`

const TasksHabitsList = ({
  taskDataUnits,
  habitDataUnits,
  onDeleteTaskDataUnit,
  onDeleteHabitDataUnit,
}) => {
  return (
    <CardWrapper>
      <Wrapper>
        <Container>
        <h2>Tasks</h2>
        {taskDataUnits.length > 0 ? (
          <ListWrapper>
            {taskDataUnits.map((task) => (
              <TaskItem
                task={task}
                key={task.id}
                onDeleteTaskDataUnit={onDeleteTaskDataUnit}
              />
            ))}
          </ListWrapper>
        ) : (
          <p>No tasks found.</p>
        )}
        </Container>
        <Container>
        <h2>Habits</h2>
        {habitDataUnits.length > 0 ? (
          <ListWrapper>
            {habitDataUnits.map((habit) => (
              <HabitItem
                habit={habit}
                key={habit.id}
                onDeleteHabitDataUnit={onDeleteHabitDataUnit}
              />
            ))}
          </ListWrapper>
        ) : (
          <p>No habits found.</p>
        )}
        </Container>
      </Wrapper>
    </CardWrapper>
  );
};

export default TasksHabitsList;

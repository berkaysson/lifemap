import { useState } from "react";
import styled from "styled-components";

import ToggleButton from "../Wrappers/Styled-Elements/ToggleButton";
import TasksForm from "./Tasks/TasksForm";
import HabitsForm from "./Habits/HabitsForm";
import { CardWrapper } from "../Wrappers/Styled-Wrappers/CardWrapper";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: ${({ theme }) => theme.sizes.medium};
  gap: ${({ theme }) => theme.sizes.medium};
`;

const TasksHabitsWrapper = ({
  activityCategories,
  onAddTaskUnit,
  onAddHabitUnit,
  setSelectedForm,
}) => {
  const [selectedOption, setSelectedOption] = useState("tasks");

  const toggleTasksHabitsHandler = (mode) => {
    setSelectedOption(mode);
    setSelectedForm(mode);
  };

  return (
    <CardWrapper>
      <Wrapper>
        <ToggleButton
          onClick={toggleTasksHabitsHandler}
          options={[
            { value: "tasks", label: "Tasks" },
            { value: "habits", label: "Habits" },
          ]}
        />
        {selectedOption === "tasks" ? (
          <TasksForm
            activityCategories={activityCategories}
            onAddTaskUnit={onAddTaskUnit}
          />
        ) : (
          <HabitsForm
            activityCategories={activityCategories}
            onAddHabitUnit={onAddHabitUnit}
          />
        )}
      </Wrapper>
    </CardWrapper>
  );
};

export default TasksHabitsWrapper;

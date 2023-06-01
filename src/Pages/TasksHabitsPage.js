import styled from "styled-components";
import TasksHabitsWrapper from "../Components/TasksHabits";

const Wrapper = styled.section`
  border: 2px solid blue;
  padding: 1rem;
`;

const TasksHabitsPage = ({
  activityCategories,
  onAddTaskUnit
}) => {
  return (
    <Wrapper>
      <h1>AddTasksHabitsPage</h1>
      <TasksHabitsWrapper
        activityCategories={activityCategories}
        onAddTaskUnit={onAddTaskUnit}
      />
      <div>
        A COMPONENT TO LIST ALL TASKS AND HABITS
        <div>
          A COMPONENT TO VIEW TASKS HABITS, AND MAKE A BUTTON TO OPEN A MODAL
          FORM TO EDIT TAKS-HABITS
        </div>
      </div>
    </Wrapper>
  );
};

export default TasksHabitsPage;

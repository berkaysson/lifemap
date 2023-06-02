import styled from "styled-components";
import TasksHabitsWrapper from "../Components/TasksHabits";
import TasksHabitsList from "../Components/TasksHabitsList";

const Wrapper = styled.section`
  border: 2px solid blue;
  padding: 1rem;
`;

const TasksHabitsPage = ({
  activityCategories,
  onAddTaskUnit,
  onAddHabitUnit,
  taskDataUnits,
  habitDataUnits,
}) => {
  return (
    <Wrapper>
      <h1>AddTasksHabitsPage</h1>
      <TasksHabitsWrapper
        activityCategories={activityCategories}
        onAddTaskUnit={onAddTaskUnit}
        onAddHabitUnit={onAddHabitUnit}
      />
      <div>
        <TasksHabitsList
          taskDataUnits={taskDataUnits}
          habitDataUnits={habitDataUnits}
        />
        <div>
          A COMPONENT TO VIEW TASKS HABITS, AND MAKE A BUTTON TO OPEN A MODAL
          FORM TO EDIT TAKS-HABITS
        </div>
      </div>
    </Wrapper>
  );
};

export default TasksHabitsPage;

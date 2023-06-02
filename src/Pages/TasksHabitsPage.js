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
  onDeleteTaskDataUnit,
  onDeleteHabitDataUnit,
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
          onDeleteTaskDataUnit={onDeleteTaskDataUnit}
          onDeleteHabitDataUnit={onDeleteHabitDataUnit}
        />
      </div>
    </Wrapper>
  );
};

export default TasksHabitsPage;

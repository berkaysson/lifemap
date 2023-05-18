import styled from "styled-components";

const Wrapper = styled.section`
  border: 2px solid blue;
  padding: 1rem;
`;

const TasksHabitsPage = () => {
  return (
    <Wrapper>
      <h1>AddTasksHabitsPage</h1>
      <div>A FORM COMPONENT TO CREATE TASKS-HABITS</div>
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

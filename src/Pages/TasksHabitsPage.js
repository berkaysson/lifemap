import styled from "styled-components";

import TasksHabitsWrapper from "../Components/Tasks&Habits/TasksHabits";
import TasksHabitsList from "../Components/Tasks&Habits/TasksHabitsList";
import HeaderContent from "../Components/Contents/HeaderContent";
import ParagraphContent from "../Components/Contents/ParagraphContent";

const TasksHabitsPageWrapper = styled.section`
  display: grid;
  grid-template-columns: 1fr minmax(600px, 80%) 1fr;
  grid-template-rows: repeat(4, auto);
  align-content: start;
  justify-content: center;
  align-items: stretch;
  justify-items: stretch;
  gap: ${({ theme }) => theme.sizes.large};
  width: 100%;
  height: 100%;
`;

const Header = styled.header`
  grid-area: 1 / 1 / 2 / 4;
`;

const Welcome = styled.div`
  grid-area: 2 / 2 / 3 / 3;
`;

const TaskHabit = styled.div`
  grid-area: 3 / 2 / 4 / 3;
  display: grid;
  align-content: start;
  justify-content: center;
  align-items: stretch;
  justify-items: stretch;
  padding: ${({ theme }) => theme.sizes.medium};
  gap: 1px;
  box-shadow: ${({ theme }) => theme.boxShadows.smallCardShadow};
  border: 1px solid ${({ theme }) => theme.colors.alternative};
  border-radius: ${({ theme }) => theme.radius.medium};
`;

const TaskHabitContainer = styled.div`
  display: grid;
  grid-template-rows: 1fr; //change to 1fr 1fr responsive design
  grid-template-columns: 70% auto; //change to 1fr responsive design
`;

const FormHeader = styled.h2`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.sizes.small};
`;

const TaskHabitListWrapper = styled.div`
  grid-area: 4 / 2 / 5 / 3;
  align-content: start;
  justify-content: center;
  align-items: stretch;
  justify-items: stretch;
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
    <TasksHabitsPageWrapper>
      <Header>
        <HeaderContent headerText={"Tasks and Habits"} />
      </Header>
      <Welcome>
        <ParagraphContent>
          <b>Manage Your Activity Units and Categories with Ease</b> <br />
          Welcome to the Activity Units Management page. Take control of your
          daily activities effortlessly using Lifemap's intuitive interface.{" "}
          <br />
          You can also edit the activity categories.
        </ParagraphContent>
      </Welcome>
      <TaskHabit>
        <FormHeader>Activity Form</FormHeader>
        <TaskHabitContainer>
          <TasksHabitsWrapper
            activityCategories={activityCategories}
            onAddTaskUnit={onAddTaskUnit}
            onAddHabitUnit={onAddHabitUnit}
          />
          <ParagraphContent>INTRODUCTION TO FORM</ParagraphContent>
        </TaskHabitContainer>
      </TaskHabit>
      <TaskHabitListWrapper>
        <TasksHabitsList
          taskDataUnits={taskDataUnits}
          habitDataUnits={habitDataUnits}
          onDeleteTaskDataUnit={onDeleteTaskDataUnit}
          onDeleteHabitDataUnit={onDeleteHabitDataUnit}
        />
      </TaskHabitListWrapper>
    </TasksHabitsPageWrapper>
  );
};

export default TasksHabitsPage;

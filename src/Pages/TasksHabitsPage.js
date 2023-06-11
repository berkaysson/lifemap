import styled from "styled-components";

import TasksHabitsWrapper from "../Components/Tasks&Habits/TasksHabits";
import TasksHabitsList from "../Components/Tasks&Habits/TasksHabitsList";
import HeaderContent from "../Components/Contents/HeaderContent";
import ParagraphContent from "../Components/Contents/ParagraphContent";
import { useState } from "react";

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
  const [selectedForm, setSelectedForm] = useState("tasks");

  return (
    <TasksHabitsPageWrapper>
      <Header>
        <HeaderContent headerText={"Tasks and Habits"} />
      </Header>
      <Welcome>
        <ParagraphContent>
          <b>Effortlessly manage your tasks and habits</b> <br />
          Customize Lifemap to fit your preferences and take control of your
          tracking experience.
        </ParagraphContent>
      </Welcome>
      <TaskHabit>
        <FormHeader>Task and Habit Form</FormHeader>
        <TaskHabitContainer>
          <TasksHabitsWrapper
            activityCategories={activityCategories}
            onAddTaskUnit={onAddTaskUnit}
            onAddHabitUnit={onAddHabitUnit}
            setSelectedForm={setSelectedForm}
          />
          <ParagraphContent>
            {selectedForm === "tasks"
              ? `Tasks Form, begin by selecting the activity type and category that
              best represent the task you want to track. Set a specific date
              range within which the task needs to be completed. Enter the
              estimated time in minutes required to accomplish the task.
              Finally, provide a name to easily identify and track the task.
            `
              : `Habits Form, select the activity type and category. Choose the
              frequency of the habit, to establish a consistent practice. Set
              the habit period, such as 30 times of frequency, and allocate the
              desired time in minutes for each habit period. By providing a
              name, you can easily track and monitor your progress.
              For example, a habit could be Weekly Reading (Personal Growth, Learning) for 4 weeks, allocating 100 minutes per week.
            `}
          </ParagraphContent>
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

import styled from "styled-components";

import TasksHabitsWrapper from "../Components/Tasks&Habits/TasksHabits";
import TasksHabitsList from "../Components/Tasks&Habits/TasksHabitsList";
import HeaderContent from "../Components/Contents/HeaderContent";
import ParagraphContent from "../Components/Contents/ParagraphContent";
import { useState } from "react";
import { motion } from "framer-motion";
import { animations } from "../Style/animations";
import { AnimatedPage } from "../Components/Wrappers/AnimatedPage";

const TasksHabitsPageWrapper = styled.section`
  display: grid;
  grid-template-columns: 1fr minmax(550px, 80%) 1fr;
  grid-template-rows: repeat(4, auto);
  align-content: start;
  justify-content: center;
  align-items: stretch;
  justify-items: stretch;
  gap: ${({ theme }) => theme.sizes.large};
  width: 100%;
  height: 100%;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.sizes.medium};
  }
`;

const Header = styled.header`
  grid-area: 1 / 1 / 2 / 4;

  @media (max-width: 768px) {
    grid-area: 1 / 1 / 2 / 2;
  }
`;

const Welcome = styled.div`
  grid-area: 2 / 2 / 3 / 3;

  @media (max-width: 768px) {
    grid-area: 2 / 1 / 3 / 2;
  }
`;

const TaskHabit = styled(motion.div)`
  grid-area: 3 / 2 / 4 / 3;
  display: grid;
  align-content: start;
  justify-content: center;
  align-items: stretch;
  justify-items: stretch;
  padding: ${({ theme }) => theme.sizes.large};
  box-shadow: ${({ theme }) => theme.boxShadows.smallCardShadow};
  border: 1px solid ${({ theme }) => theme.colors.alternative};
  border-radius: ${({ theme }) => theme.radius.medium};

  @media (max-width: 768px) {
    grid-area: 3 / 1 / 4 / 2;
    padding: ${({ theme }) => theme.sizes.small};
  }

  @media (max-width: 375px) {
    padding: 3px;
  }
`;

const TaskHabitContainer = styled.div`
  display: grid;
  grid-template-rows: 1fr; //change to 1fr 1fr responsive design
  grid-template-columns: 70% auto; //change to 1fr responsive design
  gap: ${({ theme }) => theme.sizes.small};

  @media (max-width: 1024px) {
    grid-template-rows: auto auto;
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.sizes.medium};
  }

  @media (max-width: 768px) {
    grid-template-rows: auto auto;
    grid-template-columns: 1fr;
    gap: 5px;
  }
`;

const FormHeader = styled.h2`
  text-align: center;
`;

const TaskHabitListWrapper = styled.div`
  grid-area: 4 / 2 / 5 / 3;
  align-content: start;
  justify-content: center;
  align-items: stretch;
  justify-items: stretch;

  @media (max-width: 768px) {
    grid-area: 4 / 1 / 5 / 2;
  }
`;

const TasksHabitsPage = ({
  activityCategories,
  onAddTaskUnit,
  onAddHabitUnit,
  taskDataUnits,
  habitDataUnits,
  onDeleteTaskDataUnit,
  onDeleteHabitDataUnit,
  fetchUpdateHandler
}) => {
  const [selectedForm, setSelectedForm] = useState("tasks");

  return (
    <AnimatedPage>
      <TasksHabitsPageWrapper>
        <Header>
          <HeaderContent headerText={"Tasks and Habits"} />
        </Header>
        <Welcome>
          <ParagraphContent>
            <b>Effortlessly manage your tasks and habits</b> <br />
            Create new tasks and habits to stay organized and focused on your
            goals. The page features a visually appealing and user-friendly
            interface, allowing you to effortlessly track your progress. Easily
            view your current tasks and habits and stay motivated as you witness
            your progress unfold.
          </ParagraphContent>
        </Welcome>
        <TaskHabit
          variants={animations.cardAnimation}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.2 }}
        >
          <FormHeader>Task and Habit Form</FormHeader>
          <TaskHabitContainer>
            <TasksHabitsWrapper
              activityCategories={activityCategories}
              onAddTaskUnit={onAddTaskUnit}
              onAddHabitUnit={onAddHabitUnit}
              setSelectedForm={setSelectedForm}
            />
            {selectedForm === "tasks" ? (
              <ParagraphContent>
                Tasks Form, begin by selecting the activity type and category
                that best represent the task you want to track. Set a specific
                date range within which the task needs to be completed. Enter
                the estimated time in minutes required to accomplish the task.
                Finally, provide a name to easily identify and track the task.
              </ParagraphContent>
            ) : (
              <ParagraphContent>
                Habits Form, select the activity type and category. Choose the
                frequency of the habit, to establish a consistent practice. Set
                the habit period, such as 30 times of frequency, and allocate
                the desired time in minutes for each habit period. By providing
                a name, you can easily track and monitor your progress. For
                example, a habit could be Weekly Reading (Personal Growth,
                Learning) for 4 weeks, allocating 100 minutes per week.
              </ParagraphContent>
            )}
          </TaskHabitContainer>
        </TaskHabit>
        <TaskHabitListWrapper>
          <TasksHabitsList
            taskDataUnits={taskDataUnits}
            habitDataUnits={habitDataUnits}
            onDeleteTaskDataUnit={onDeleteTaskDataUnit}
            onDeleteHabitDataUnit={onDeleteHabitDataUnit}
            fetchUpdateHandler={fetchUpdateHandler}
          />
        </TaskHabitListWrapper>
      </TasksHabitsPageWrapper>
    </AnimatedPage>
  );
};

export default TasksHabitsPage;

import styled from "styled-components";

import DataViewer from "../Components/DataViewer/DataViewer.js";
import HeaderContent from "../Components/Contents/HeaderContent.js";
import ParagraphContent from "../Components/Contents/ParagraphContent.js";
import { AnimatedPage } from "../Components/Wrappers/AnimatedPage.js";
import FilteredTasksHabitsList from "../Components/Tasks&Habits/FilteredTasksHabitsList.js";

const HomeWrapper = styled.section`
  display: grid;
  grid-template-columns: 70% 29%;
  grid-template-rows: auto auto 1fr auto;
  align-content: start;
  justify-content: center;
  align-items: stretch;
  justify-items: stretch;
  gap: ${({ theme }) => theme.sizes.large};
  padding: 0 10px;
  width: 100%;
  height: 100%;
`;

const Header = styled.header`
  grid-area: 1 / 1 / 2 / 3;
`;

const Welcome = styled.div`
  grid-area: 2 / 1 / 3 / 2;
`;

const Viewer = styled(DataViewer)`
  grid-area: 3 / 1 / 4 / 2;
  padding: 0 10px;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.sizes.medium};
  grid-area: 2 / 2 / 4 / 3;
  padding: 0 10px;
`;

const Reminder = styled.div`
  grid-area: 4 / 1 / 5 / 3;
  margin-top: 1rem;
`;

const HomePage = ({
  activityCategories,
  todaysActivityDataUnit,
  taskDataUnits,
  habitDataUnits,
}) => {
  return (
    <AnimatedPage>
      <HomeWrapper>
        <Header>
          <HeaderContent headerText="HOME" />
        </Header>
        <Welcome>
          <ParagraphContent>
            Welcome to <b>Lifemap</b>, your personal life tracking tool. Stay
            organized and achieve your goals by tracking your activities and
            finances in one place. Take control of your life and make every day
            count.
          </ParagraphContent>
        </Welcome>
        <Viewer
          selectedDateDataUnit={todaysActivityDataUnit}
          activityCategories={activityCategories}
        />
        <Info>
          <ParagraphContent>
            <b>Activity Tracking:</b> Log your daily activities, categorize
            them, and set goals to make the most of your time. Lifemap allows
            you to track activities down to the minute, giving you a
            comprehensive view of your routines and habits.
          </ParagraphContent>

          <ParagraphContent>
            <b>Finance Management:</b> Keep your finances in check by recording
            your expenses and income.
          </ParagraphContent>

          <ParagraphContent>
            <b>Task and Habit Management:</b> Create tasks and build healthy
            habits that align with your goals. Lifemap's integration of tasks
            and habits with activities ensures that you stay focused, motivated,
            and productive.
          </ParagraphContent>
        </Info>
        <Reminder>
          <FilteredTasksHabitsList
            taskDataUnits={taskDataUnits}
            habitDataUnits={habitDataUnits}
          />
        </Reminder>
      </HomeWrapper>
    </AnimatedPage>
  );
};

export default HomePage;

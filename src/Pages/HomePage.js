import styled from "styled-components";

import DataViewer from "../Components/DataViewer/DataViewer.js";
import HeaderContent from "../Components/Contents/HeaderContent.js";
import ParagraphContent from "../Components/Contents/ParagraphContent.js";

const HomeWrapper = styled.section`
  display: grid;
  grid-template-columns: 70% 29%;
  grid-template-rows: auto auto 1fr auto;
  align-content: start;
  justify-content: center;
  align-items: stretch;
  justify-items: stretch;
  gap: ${({ theme }) => theme.sizes.small};
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
  grid-area: 4 / 1 / 5 / 2;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.sizes.medium};
  grid-area: 2 / 2 / 4 / 3;
`;

const Tasks = styled.div`
  border: 1px black solid;
  grid-area: 3 / 1 / 4 / 2;
`;

const Reminder = styled.div`
  border: 1px black solid;
  grid-area: 4 / 2 / 5 / 3;
`;

const HomePage = ({ activityCategories, todaysActivityDataUnit }) => {
  return (
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
          <b>Activity Tracking:</b> Log your daily activities, categorize them, and set
          goals to make the most of your time. Lifemap allows you to track
          activities down to the minute, giving you a comprehensive view of your
          routines and habits.
        </ParagraphContent>

        <ParagraphContent>
          <b>Finance Management:</b> Keep your finances in check by recording your
          expenses and income.
        </ParagraphContent>

        <ParagraphContent>
        <b>Task and Habit Management:</b> Create tasks and build healthy habits that
          align with your goals. Lifemap's integration of tasks and habits with
          activities ensures that you stay focused, motivated, and productive.
        </ParagraphContent>
      </Info>
      <Tasks>A COMPONENT TO VIEW ACTIVE TASKS-HABITS</Tasks>
      <Reminder>
        A REMINDER COMPONENT FOR TASKS-HABITS WHICH TIME EXPIRES
      </Reminder>
    </HomeWrapper>
  );
};

export default HomePage;

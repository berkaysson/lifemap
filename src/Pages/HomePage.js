import styled from "styled-components";

import DataViewer from "../Components/DataViewer/DataViewer.js";
import HeaderContent from "../Components/Contents/HeaderContent.js";
import ParagraphContent from "../Components/Contents/ParagraphContent.js";

const HomeWrapper = styled.section`
  display: grid;
  grid-template-areas:
    "header  header"
    "welcome  info"
    "tasks  info"
    "viewer  reminder";
  grid-template-rows: auto auto auto auto;
  grid-template-columns: 60% 39%;
  grid-gap: 10px;
  width: 100%;
`;

const Header = styled.header`
  grid-area: header;
`;

const Welcome = styled.div`
  grid-area: welcome;
`;

const Viewer = styled(DataViewer)`
  border: 1px black solid;
  grid-area: viewer;
`;

const Info = styled.div`
  grid-area: info;
`;

const Tasks = styled.div`
  border: 1px black solid;
  grid-area: tasks;
`;

const Reminder = styled.div`
  border: 1px black solid;
  grid-area: reminder;
`;

const HomePage = ({ activityCategories, todaysActivityDataUnit }) => {
  return (
    <HomeWrapper>
      <Header>
        <HeaderContent headerText="HOME" />
      </Header>
      <Welcome>
        <ParagraphContent
          text={
            "Welcome to Lifemap, your personal life tracking tool. Stay organized and achieve your goals by tracking your activities and finances in one place. Take control of your life and make every day count."
          }
        />
      </Welcome>
      <Viewer
        selectedDateDataUnit={todaysActivityDataUnit}
        activityCategories={activityCategories}
      />
      <Info>
        <ParagraphContent text={"Activity Tracking: Log your daily activities, categorize them, and set goals to make the most of your time. Lifemap allows you to track activities down to the minute, giving you a comprehensive view of your routines and habits."} />
        <ParagraphContent text={"Finance Management: Keep your finances in check by recording your expenses and income."} />
        <ParagraphContent text={"Task and Habit Management: Create tasks and build healthy habits that align with your goals. Lifemap's integration of tasks and habits with activities ensures that you stay focused, motivated, and productive."} />
      </Info>
      <Tasks>A COMPONENT TO VIEW ACTIVE TASKS-HABITS</Tasks>
      <Reminder>
        A REMINDER COMPONENT FOR TASKS-HABITS WHICH TIME EXPIRES
      </Reminder>
    </HomeWrapper>
  );
};

export default HomePage;

import styled from "styled-components";

import DataViewer from "../Components/DataViewer/DataViewer.js";
import HeaderContent from "../Components/Contents/HeaderContent.js";
import ParagraphContent from "../Components/Contents/ParagraphContent.js";

const HomeWrapper = styled.section`
  display: grid;
  grid-template-areas:
    "header header header"
    "welcome welcome info"
    "tasks tasks tasks"
    "viewer viewer reminder";
  grid-template-rows: auto auto 1fr 1fr;
  grid-template-columns: auto;
  grid-gap: 10px;
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
  border: 1px black solid;
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
      <Info>INFO</Info>
      <Tasks>A COMPONENT TO VIEW ACTIVE TASKS-HABITS</Tasks>
      <Reminder>
        A REMINDER COMPONENT FOR TASKS-HABITS WHICH TIME EXPIRES
      </Reminder>
    </HomeWrapper>
  );
};

export default HomePage;

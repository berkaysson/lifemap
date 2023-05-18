import styled from "styled-components";

import DataViewer from "../Components/DataViewer";

const HomeWrapper = styled.section`
  border: 2px solid red;
  padding: 1rem;
`;

const CURRENT_DATE = new Date().toISOString().slice(0, 10);

const HomePage = ({ selectedDateDataUnit, categories }) => {
  return (
    <HomeWrapper>
      <h1>HOME</h1>
      <div>Welcome USER_NAME</div>
      <div>{CURRENT_DATE}</div>
      <DataViewer
        selectedDateDataUnit={selectedDateDataUnit}
        categories={categories}
      />
      <div>A COMPONENT TO VIEW TO ACTIVE TASKS-HABITS</div>
      <div>A REMINDER COMPONENT TO TASKS-HABITS WHICH TIME EXPIRES</div>
      <div>SETTINGS AND INFO LINK</div>
    </HomeWrapper>
  );
};

export default HomePage;

import styled from "styled-components";

import ImportExport from "../Components/Others/ImportExport";
import { AnimatedPage } from "../Components/Wrappers/AnimatedPage";
import HeaderContent from "../Components/Contents/HeaderContent";

const Wrapper = styled.section`
  display: grid;
  grid-template-columns: 1fr minmax(550px, 80%) 1fr;
  grid-template-rows: repeat(3, auto);
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

const SettingsContainer = styled.div`
  grid-area: 2 / 2 / 4 / 3;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 3rem;
  width: 100%;
  padding: ${({ theme }) => theme.sizes.large};
`;

const SettingsPage = ({ onExport, onImport }) => {
  return (
    <AnimatedPage>
      <Wrapper>
      <Header>
        <HeaderContent headerText={"Settings"} />
      </Header>
      <SettingsContainer>
        <ImportExport onExport={onExport} onImport={onImport} />
      </SettingsContainer>
      </Wrapper>
    </AnimatedPage>
  );
};

export default SettingsPage;

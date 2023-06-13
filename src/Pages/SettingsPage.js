import styled from "styled-components";

import ImportExport from "../Components/Others/ImportExport";
import { AnimatedPage } from "../Components/Wrappers/AnimatedPage";

const Wrapper = styled.section`
  border: 2px solid black;
  padding: 1rem;
`;

const SettingsPage = ({ onExport, onImport }) => {
  return (
    <AnimatedPage>
      <Wrapper>
        <h1>SettingsPage</h1>
        <div>USERNAME</div>
        <ImportExport onExport={onExport} onImport={onImport} />
        <div>THEME???</div>
        <div>RESET DB</div>
      </Wrapper>
    </AnimatedPage>
  );
};

export default SettingsPage;

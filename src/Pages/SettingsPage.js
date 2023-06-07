import styled from "styled-components";

import ImportExport from "../Components/Others/ImportExport";

const Wrapper = styled.section`
  border: 2px solid black;
  padding: 1rem;
`;

const SettingsPage = ({ onExport, onImport }) => {
  return (
    <Wrapper>
      <h1>SettingsPage</h1>
      <div>USERNAME</div>
      <ImportExport onExport={onExport} onImport={onImport} />
      <div>THEME???</div>
      <div>RESET DB</div>
    </Wrapper>
  );
};

export default SettingsPage;

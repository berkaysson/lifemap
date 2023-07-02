import styled from "styled-components";
import { auth } from "../firebase";
import ImportExport from "../Components/Others/ImportExport";
import { AnimatedPage } from "../Components/Wrappers/AnimatedPage";
import HeaderContent from "../Components/Contents/HeaderContent";
import Button from "../Components/Wrappers/Styled-Elements/Button";
import { useState } from "react";

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

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Header = styled.header`
  grid-area: 1 / 1 / 2 / 4;

  @media (max-width: 768px) {
    grid-area: 1 / 1 / 2 / 2;
  }
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

  @media (max-width: 768px) {
    grid-area: 2 / 1 / 3 / 2;
    padding: ${({ theme }) => theme.sizes.medium};
  }

  @media (max-width: 425px) {
    grid-area: 2 / 1 / 3 / 2;
    padding: ${({ theme }) => theme.sizes.small};
  }

  @media (max-width: 375px) {
    padding: 5px;
  }
`;

const AuthInfoContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

const SettingsPage = ({
  onExport,
  onImport,
  handleLogOut,
  isGuestModeActive,
}) => {
  return (
    <AnimatedPage>
      <Wrapper>
        <Header>
          <HeaderContent headerText={"Settings"} />
        </Header>
        <SettingsContainer>
          <ImportExport onExport={onExport} onImport={onImport} />
          <AuthInfoContainer>
            <p>
              Signed In as{" "}
              <b>{isGuestModeActive ? "Guest" : auth?.currentUser?.email}</b>
            </p>
            <Button text={"Sign Out"} type={"button"} onClick={handleLogOut} />
          </AuthInfoContainer>
        </SettingsContainer>
      </Wrapper>
    </AnimatedPage>
  );
};

export default SettingsPage;
